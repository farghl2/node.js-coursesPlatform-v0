const mongoose = require('mongoose');

const dbConnection =()=>{
    mongoose.connect(process.env.DB_URI).then((res)=>{
        console.log('db start running');                       
        
    }).catch((err)=>{console.log(err)})
    

}

module.exports = dbConnection;