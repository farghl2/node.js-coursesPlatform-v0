const jwt = require('jsonwebtoken');

exports.generateToken =async (payLoad)=>{
   const token =await jwt.sign(payLoad,process.env.WEB_SECRET_KEY,{expiresIn:'2m'} )
   return token;
}