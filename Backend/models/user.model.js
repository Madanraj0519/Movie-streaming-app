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
    phoneNumber : {
        type : String,
    },
    url : {
        type : String,
    },
    favorites : [
        {
            movie : Object,
        }
    ],
    subscription : {
        subscriptionId : mongoose.Schema.Types.ObjectId,
        title : {
            type : String,
            default : null,
        },
        price : {
            type : String,
            default : null,
        },
        status : {
            type : Boolean,
            default : false,
        }
    },
    createdOn : {
        type : Date,
        default : new Date().getTime(),
    },
    isUpdate : {
        type : Boolean,
        default : false,
    }
});


module.exports = mongoose.model('User', userModel);