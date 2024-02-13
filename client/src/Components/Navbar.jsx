import React, { useContext } from 'react';
import { UserContext } from './ContextProvider';
import { userLogout } from '../service/api';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function Navbar() {
    const { account, setAccount } = useContext(UserContext);
    const navigate = useNavigate();

    const logout = async () => {
        let response = await userLogout();
        if(!response){
            toast.error("Logout Error! Please try again", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }else{
            setAccount('', navigate('/'));
            // dispatch(emptyCart());
        }
    }
    return (
        <AppBar position="static">
            <Toolbar>
                {/* <Typography variant="h6" onClick={() => account ? navigate('/gallery'): navigate('/')} component="div" sx={{ flexGrow: 1 }}>
                    Photo Gallery
                </Typography> */}
                <Button color="inherit" onClick={() => account ? navigate('/gallery'): navigate('/')}>Photo Gallery</Button> 
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }}>
                    {account ? 
                        <>
                            <Button color="inherit" onClick={() => navigate('/addImage')}>Add Image</Button> 
                            <Button color="inherit" onClick={() => logout()}>Logout</Button>
                        </> :
                        <>
                            <Button color="inherit" onClick={() => navigate('/')}>Login</Button>
                            <Button color="inherit" onClick={() => navigate('/signup')}>SignUp</Button>
                        </>
                    }
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;