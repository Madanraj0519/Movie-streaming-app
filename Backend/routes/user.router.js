const express = require('express');
const userRoute = express.Router();
const {updateUser, changeUserPassword, updateUserAvatar, deleteUser} = require('../controller/user.controller');
const {verifyToken} = require("../utilities/verifyToken");

userRoute.post('/updateUser/:id', verifyToken, updateUser);
userRoute.post('/updateUserAvatar/:id', verifyToken, updateUserAvatar);
userRoute.post('/updateUserPassword/:id', verifyToken ,changeUserPassword);
userRoute.delete('/deleteUser/:id', verifyToken , deleteUser);


module.exports = {
    userRoute
}

