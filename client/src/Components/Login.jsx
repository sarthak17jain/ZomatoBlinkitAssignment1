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

const CreateAccount = styled(Typography)`
    margin: auto 0 5px 0;
    text-align: center;
    color: #2874f0;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer
`

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const loginInitialValues = {
    username: '',
    password: ''
};

const Login = () => {
    const [ login, setLogin ] = useState(loginInitialValues);
    const [ error, showError] = useState(false);
    const { account, setAccount } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        showError(false);
    }, [login])

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const loginUser = async() => {
        let response = await authenticateLogin(login);
        console.log(response);
        if(!response){ 
            showError(true);
        }else {
            showError(false);
            setAccount(response.data.account, navigate('/gallery'));
        }
    }
    
    const handleLogin = () => {
        if(login.email && login.password){
            loginUser();
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

    const [showLoginPassword, setShowLoginPassword] = useState(false);
    return (
        <Container>
            <Wrapper>
                <TextField variant="standard" onChange={(e) => onValueChange(e)} name='email' label='Enter Email' />
                <FormControl variant="standard">
                    <InputLabel htmlFor="login-password">Enter Password</InputLabel>
                    <Input
                        id="login-password"
                        type={showLoginPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowLoginPassword((show) => !show)}
                                    onMouseDown={(e) => e.preventDefault()}
                                >
                                    {showLoginPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        onChange={(e) => onValueChange(e)}
                        name="password"
                    />
                </FormControl>
                { error && <Error>You have entered an invalid email or password</Error> }
                <LoginButton onClick={() => handleLogin()} >Login</LoginButton>
                <CreateAccount onClick={() => navigate('/signup')}>New? Create an account</CreateAccount>
            </Wrapper> 
        </Container>
    )
}

export default Login;