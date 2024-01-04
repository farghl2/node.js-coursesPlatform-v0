
const UserModel = require('../models/user.model')
const asyncWraber = require("../middlewares/asyncWraber");
const httpResStatusText = require('../utils/httpResStatusText');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const appError = require('../utils/appError');
const { generateToken } = require('../utils/generateJWT');


exports.getAllUsers = asyncWraber(async (req, res) => {
    const { page, limit } = req.query;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;
    const users = await UserModel.find({}, { "__v": false, "password": false }).skip(skip).limit(limitNumber).exec();;
    return res.status(200).json({ status: httpResStatusText.SUCCESS, data: { users } });
});

exports.creatUser = asyncWraber(async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        const error = appError.create(500, httpResStatusText.FAIL, error.array())
        return next(error);
    }
    const { firstname, lastname, email, password } = req.body;
    

    const hashedPasssword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ firstname, lastname, email, password: hashedPasssword,avatar:req.file.filename });
    const token =await generateToken({email:newUser.email, id:newUser._id, role:newUser.role});
    newUser.token = token;
    await newUser.save();
    return res.status(201).json({ status: httpResStatusText.SUCCESS, data:{token:newUser.token} });



});

exports.login = asyncWraber(async (req, res, next) => {
  

    const { email, password } = req.body;
    if (!email || !password) {
        const error = appError.create(500, httpResStatusText.FAIL, 'email and password is required')
        return next(error)
    }
    const user = await UserModel.findOne({ 'email': email });
    if(!user){
        const error = appError.create(500, httpResStatusText.FAIL, 'user not found')
        return next(error)

    }

    const matchedPassword =await bcrypt.compare(password, user.password);

    if(matchedPassword) {
        const token = await generateToken({email:user.email, id:user._id, role:user.role});
        return res.status(200).json({status:httpResStatusText.SUCCESS,data:{token}})
    }else {
        const error = appError.create(500, httpResStatusText.ERROR, 'password is wrong')
        return next(error)

    }



});