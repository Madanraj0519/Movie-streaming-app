const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const errorHandler = require("../utilities/errorHandler");
const userModel = require('../models/user.model');
const favoriteModel = require('../models/favorite.model');



const updateUser = async(req, res, next) => {

    if(req.user.id !== req.params.id){
        return next(errorHandler(401, "You can update your account only"));
    }
   
    try {
        const updateUser = await userModel.findByIdAndUpdate(
            req.params.id,
            {
                $set : {
                    userName : req.body.userName, 
                    email : req.body.email, 
                    phoneNumber : req.body.phoneNumber,
                    url : req.body.url,
                    isUpdate : true,
                }
            },
            { new : true}
        );

        res.status(200).json({
            success : true,
            message : "User updated successfully",
            user : updateUser,
        });
    } catch (error) {
        next(error);
    }
};


const updateUserAvatar = async(req, res, next) => {

    if(req.user.id !== req.params.id){
        return next(errorHandler(401, "You can update your account only"));
    }
   
    try {
        const updateUser = await userModel.findByIdAndUpdate(
            req.params.id,
            {
                $set : {
                    url : req.body.url,
                    isUpdate : true,
                }
            },
            { new : true}
        );

        res.status(200).json({
            success : true,
            message : "User avatar updated successfully",
            user : updateUser,
        });

        // console.log(updateUser);
    } catch (error) {
        next(error);
    }
};


const changeUserPassword = async(req, res, next) => {

    if(req.user.id !== req.params.id){
        return next(401, "You can change your account password only")
    }

    try {
    const user = await userModel.findById(req.params.id);

    const isPasswordTrue = bcrypt.compareSync(req.body.oldPassword, user.password);

    if(!isPasswordTrue){
        return next(errorHandler(401, "Your old password is incorrect"));
    }

    if(req.body.oldPassword === req.body.newPassword || req.body.oldPassword === req.body.confirmPassword){
        return next(errorHandler(401, "Old password and new password or confirm password is same, change your new password"));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(errorHandler(401, "Your new password or confirm password is not same"));
    }

    const newPassword = bcrypt.hashSync(req.body.confirmPassword);

    const newUserPassword = await userModel.findByIdAndUpdate(
        req.params.id,
        {
            $set : {
                password : newPassword,
                isUpdate: true,
            }
        },
        { new : true },
    );

    res.status(200).json({
        success : true,
        message : "User password updated successfully",
        user : newUserPassword,
    });
    } catch (error) {
        next(error);
    }
};


const deleteUser = async(req, res, next) => {

    if(req.user.id !== req.params.id){
        return next(errorHandler(401, "You can delete only your account!"));
    }

    try {
        
        const deleteUser = await userModel.findById(req.params.id);

        // console.log(deleteUser);

        const favorite = await favoriteModel.find({
            userId : req.params.id,
        });

        if(favorite.length > 0){
            await favoriteModel.deleteMany({ userId : req.params.id });
        };

        await userModel.findByIdAndDelete(req.params.id);

        res.status(200).
        json({
            success : true,
            message : "Your account has been deleted successfully",
        })

    } catch (error) {
        next(error);
    }
};


module.exports = {
    updateUser, changeUserPassword,
    updateUserAvatar, deleteUser
}