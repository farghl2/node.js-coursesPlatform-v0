const appError = require("../utils/appError");

const alloweRole = (...roles)=>{
    return (req,res, next)=>{
        if(!roles.includes(req.currentUser.role)){
            return next(appError.creat('you can not do this',401));
        }
     
    }

}

module.exports = alloweRole;