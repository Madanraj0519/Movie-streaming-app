const jwt = require('jsonwebtoken');
const errorHandler = require("../utilities/errorHandler");

const verifyToken = (req, res, next) => {

    const token = req.cookies.access_token;

    // console.log(token);

    if(!token) return next(errorHandler(404, "Your are not authorized to access"));

    jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, user) => {

        if(err) return next(errorHandler(403, "Token is invalid"));

        req.user = user;
        // console.log("user" , req.user);

        next();
    });
};


module.exports = {
    verifyToken
};