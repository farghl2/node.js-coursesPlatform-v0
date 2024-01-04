const express = require('express');
const {getAllUsers, creatUser, login} = require('../services/user.service');
const userValidate = require('../middlewares/user.validation.middleware');
const verifyToken = require('../middlewares/verifyToken');
const alloweRole = require('../middlewares/allowedRole');
const multer  = require('multer');
const appError = require('../utils/appError');

const diskStorage = multer.diskStorage({
    destination:function(req,file, cb){
        cb(null, 'uploads');

    },
    filename:function(req, file, cb){
        const fileName = `user-${Date.now()}.${file.mimetype.split('/')[1]}`;
        cb(null, fileName);
    }
    
})
const fileFilter = (req, file, cb)=>{
    const imageType = file.mimetype.split('/')[0];
    if(imageType === 'image'){
        return cb(null, true)
    }else {
        return cb(appError.create('the file must be text',400),false)
    }
}
const upload = multer({ storage: diskStorage,fileFilter:fileFilter })


const router = express.Router();



router.route('/').get(verifyToken,alloweRole,getAllUsers);
router.route('/register').post(upload.single('avatar'),creatUser);
router.route('/login').post(login);

module.exports = router;