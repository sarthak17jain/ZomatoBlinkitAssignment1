const express = require('express');
const { userSignUp, userLogIn, verifyToken, logout } = require('../controller/user-controller.js');

const authRouter = express.Router();

authRouter.post('/signup', userSignUp);
authRouter.post('/login', userLogIn);
authRouter.get('/logout', logout);
authRouter.get('/checkuser', verifyToken);

module.exports = authRouter;