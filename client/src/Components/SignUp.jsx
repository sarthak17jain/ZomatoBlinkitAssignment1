import React, { useState, useEffect, useContext } from 'react';
import { Dialog, DialogContent, TextField, Box, Button, Typography } from '@mui/material';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { authenticateLogin, authenticateSignup } from '../service/api';
import { UserContext } from './ContextProvider';
import { styled } from '@mui/system';
import { toast } from 'react-toastify';

const Container = styled(Box)(({ theme }) => ({
    height: "65vh",
    padding: "0",
    width: "450px",
    margin: "100px auto 0",
    [theme.breakpoints.down('lg')]: {
        width: "65vw"
    },
    [theme.breakpoints.down('md')]: {
        width: "75vw"
    },
    [theme.breakpoints.down('sm')]: {
        width: "90vw"
    },
}));

const Wrapper = styled(Box)(({ theme }) => ({
    padding: "25px 35px",
    display: "flex",
    flex: "1",
    // overflow: "auto",
    // width: "fit-content",
    flexDirection: "column",
    boxShadow: "0px 0px 4px black",
    borderRadius: "5px",
    "& > div, & > button, & > p" : {
        marginTop: "20px",
    },
    [theme.breakpoints.down('sm')]: {
        padding: "5px 10px"
    },
}));

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const signupInitialValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: ''
};

const SignUp = () => {
    const [ signup, setSignup ] = useState(signupInitialValues);
    const { account, setAccount } = useContext(UserContext);
    const navigate = useNavigate();

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const signupUser = async() => {
        let response = await authenticateSignup(signup);
        console.log(response);
        if(!response) return;
        setAccount(response.data.account, navigate('/gallery'));
    }
    
    const handleSignup = () => {
        if(signup.firstname && signup.lastname && signup.username && signup.email && signup.password){
            signupUser();
        }else{
            toast.error("Please fill all inputs!", {
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

    const [showSignUpPassword, setShowSignUpPassword] = useState(false);
    return (
        <Container>
            <Box style={{display: 'flex', height: '100%'}}>
                <Wrapper>
                    <TextField variant="standard" onChange={(e) => onInputChange(e)} name='firstname' label='Enter Firstname' />
                    <TextField variant="standard" onChange={(e) => onInputChange(e)} name='lastname' label='Enter Lastname' />
                    <TextField variant="standard" onChange={(e) => onInputChange(e)} name='username' label='Enter Username' />
                    <TextField variant="standard" onChange={(e) => onInputChange(e)} name='email' label='Enter Email' />
                    <FormControl variant="standard">
                        <InputLabel htmlFor="signup-password">Enter Password</InputLabel>
                        <Input
                            id="signup-password"
                            type={showSignUpPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowSignUpPassword((show) => !show)}
                                        onMouseDown={(e) => e.preventDefault()}
                                    >
                                        {showSignUpPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            onChange={(e) => onInputChange(e)}
                            name="password"
                        />
                    </FormControl>
                    <LoginButton onClick={() => handleSignup()} >Continue</LoginButton>
                </Wrapper>
            </Box>
        </Container>
    )
}

export default SignUp;