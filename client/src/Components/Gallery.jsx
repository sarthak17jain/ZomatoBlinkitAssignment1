import React, { useState, useEffect, useContext } from "react";
import { UserContext } from './ContextProvider';
import './gallery.css';
import axios from "axios";

const url = process.env.REACT_APP_SERVER_BASE_URL;

function Gallery() {
    const { account } = useContext(UserContext);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.post(`${url}/image/getGallery`, {userEmail: account.email});
                setImages(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchImages();
    }, []);

    return (
        <div className="gallery">
            {images.map((image, index) => (
                <div key={index} className="gallery-item">
                    <img src={image} alt="" className="gallery-image" />
                </div>
            ))}
        </div>
    );
}

export default Gallery;
