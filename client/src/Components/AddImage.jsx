import React, {useState, useContext} from 'react';
import { UserContext } from './ContextProvider';
import { Button } from '@mui/material';
import defaultImage from '../default_image.png';
import axios from 'axios';
import { toast } from 'react-toastify';

const imgBtnStyle = {
    display: "block",
    padding: "8px 10px",
    cursor: "pointer",
    margin: "15px auto",
    width: "fit-content",
    fontSize: "1rem",
    backgroundColor: "rgb(21, 101, 192)",
    color: "white",
    borderRadius: "4px"
};

const detailInitialValues = {
    image: null,
    imageURL: defaultImage,
};

const url = process.env.REACT_APP_SERVER_BASE_URL;

function AddImage() {
    const { account } = useContext(UserContext);
    const [image, setImage] = useState(null);
    const [previewURL, setPreviewURL] = useState(defaultImage);
    const [loading, setLoading] = useState(false);

    const handleSelectImage = (e) => {
        // e.preventDefault();
        const reader = new FileReader();
        const inFile = e.target.files[0];
        reader.readAsDataURL(inFile);

        reader.onloadend = () => {
            setImage(inFile);
            setPreviewURL(reader.result);
        };
    };

    // const navigate = useNavigate();

    const handleUploadImage = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('image', image);
        formData.append('userEmail', account.email);

        try {
            const response = await axios.post(`${url}/image/uploadImage`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            setLoading(false);
            toast.success("Image uploaded successfully !", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            console.error(error);
            setLoading(false);
            toast.error(error, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

  return (
    <div>
        <img style={{display:"block", margin:"10px auto"}} src={previewURL} alt="Product Image" width="200px" height="200px"></img>

        <label style = {imgBtnStyle} htmlFor="imgUploadInp">
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="imgUploadInp"
                type="file"
                onChange={(e) => handleSelectImage(e)}
            />
            <strong>Select Image</strong>
        </label> 

        <Button sx={{display:"block", margin: "20px auto", backgroundColor:"rgb(74, 148, 137)"}} variant="contained" onClick={() => handleUploadImage()} disabled={loading}>
            {loading ? 'Uploading...' : 'Upload Image'}
        </Button>
    </div>
  )
}

export default AddImage