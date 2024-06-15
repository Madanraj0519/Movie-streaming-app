const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const errorHandler = require("../utilities/errorHandler");
const userModel = require('../models/user.model');


const createToken = (id) => {
    const jwtSecretKey = process.env.JWT_SECRET_TOKEN;

    return jwt.sign({id}, jwtSecretKey);
}


const registerUser = async(req, res, next) => {
    const { userName, email, password } = req.body;

    try {
        let user = await userModel.findOne({email});

        if(user){
            return next(errorHandler(400, 'user with this name already registered'));
        }

        const hashedPassword = bcrypt.hashSync(password);

        user = await userModel({
            userName, 
            email, 
            password : hashedPassword, 
        });

        await user.save();

        const token = createToken(user._id);
        const expireDate = new Date(Date.now() + 15 * 24 * 3600 * 1000);

        res.cookie('access_token', token, {httpOnly : true, expires : expireDate })
        .status(200).json({
            success: true,
            message : "User registered successfully",
            user,
            token,
        });
    } catch (error) {
        next(error);
    }
    
};


const loginUser = async(req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await userModel.findOne({email});

        if (!validUser) {
            return next(errorHandler(400, "User not found"));
        }

        // comparing the password which is coming from the request in the database
        const validatePassword = bcrypt.compareSync(password, validUser.password);
        
        if(!validatePassword){
            return next(errorHandler(401, "Invalid credentials"));
        }

        const { password : hashedPassword, ...user } = validUser._doc;

        const token = createToken(user._id);
        const expireDate = new Date(Date.now() + 15 * 24 * 3600 * 1000);

        res.cookie('access_token', token, { httpOnly : true, expires : expireDate})
        .status(200).json({
            success : true,
            message : `Welcome, ${user.userName}!!`,
            user,
            token,
        });
    } catch (error) {
        next(error);
    }
};


const googleAuth = async(req, res, next) => {
    try {
        const userAuth = await userModel.findOne({ email : req.body.email});

        if(userAuth){
            const token = createToken(userAuth._id);
            const expireDate = new Date(Date.now() + 15 * 24 * 3600 * 1000);

            const { password : hashedPassword, ...user } = userAuth._doc;

            res.cookie('access_token', token, { httpOnly : true, expires : expireDate})
            .status(200).json({
                success : true,
                message : `Welcome, ${user.userName}!!`,
                user,
                token,
            });
        }else{
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashedPassword = bcrypt.hashSync(generatePassword, 10);
            const newUser = new userModel({
                userName : req.body.userName.split(' ').join('').toLowerCase() + Math.floor(Math.random() * 1000).toString(),
                email : req.body.email,
                password : hashedPassword,
            });

            await newUser.save();

            const token = createToken(newUser._id);
            const expireDate = new Date(Date.now() + 15 * 24 * 3600 * 1000);
            const { password : hashedPassword2, ...user} = newUser._doc;

            res.cookie('access_token', token, { httpOnly : true, expires : expireDate}).status(200).json({
                success : true,
                message : `Welcome, ${user.userName}!!`,
                user,
                token,
            });

        }
    } catch (error) {
        next(error);
    }
};


const signOut = (req, res, next) => {
    res.clearCookie('access_token').status(200)
    .json(({
        success : true,
        message : "Sign Out Successfully"
    }))
};


module.exports = {
    registerUser, loginUser, googleAuth, signOut
}