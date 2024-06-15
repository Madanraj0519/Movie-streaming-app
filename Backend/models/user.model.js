const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    userName : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    createdOn : {
        type : Date,
        default : new Date().getTime(),
    }
});

module.exports = mongoose.model('User', userModel);