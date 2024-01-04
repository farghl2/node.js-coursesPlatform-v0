const mongoose = require('mongoose');
const validator = require('validator');
const userRoles = require('../utils/userRoles');
const UserSchema = new mongoose.Schema({
    firstname:{
        type:String,
        require:true
    },
    lastname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        validate:[validator.isEmail,'invalid email']
    },
    password:{
        type:String,
        require:true
    },
    token:{
        type:String
    },
    role:{
        type:String,
        enum:[userRoles.ADMIN, userRoles.MANAGER, userRoles.USER],
        default:userRoles.USER,
    },
    avatar:{
        type:String,
        default:'uploads/profile.jpg'
    }
})

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;