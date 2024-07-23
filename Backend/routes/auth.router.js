const express = require('express');
const { registerUser, loginUser, signOut, googleAuth } = require('../controller/auth.controller');
const authRoute = express.Router();


authRoute.post('/createAccount', registerUser);
authRoute.post('/login', loginUser);
authRoute.post('/google-auth', googleAuth);
authRoute.get('/signOut', signOut);


module.exports = { authRoute };