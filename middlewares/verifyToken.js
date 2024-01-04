const jwt = require('jsonwebtoken')
const appError = require('../utils/appError');
const httpResStatusText = require('../utils/httpResStatusText');


const verifyToken = (req, res, next)=>{
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    if(!authHeader) {
        const error = appError.create(401, httpResStatusText.ERROR, 'token is required')
        return next(error)


    }
    const token = authHeader.split(' ')[1];
    try{
           const currentUser=  jwt.verify(token, process.env.WEB_SECRET_KEY);
           req.currentUser = currentUser;

           next();
    }
    catch {
        const error = appError.create(401, httpResStatusText.ERROR, 'token is expired')
        return next(error)

    }

    next()

}

module.exports = verifyToken;