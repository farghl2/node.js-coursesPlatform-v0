const express = require('express');
const dotenv = require("dotenv")
const cors = require('cors')

const app = express();

const dbConnection = require('./data/db');
const courseRouter = require('./routes/course.route')
const userRouter = require('./routes/user.route');
const httpResStatusText = require('./utils/httpResStatusText')
const path = require('path');
dotenv.config({path:'.env'});

dbConnection();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname,'uploads')));
app.use('/course',courseRouter);
app.use('/user',userRouter);

app.all("*",(req, res, next)=>{
    return res.json({status:httpResStatusText.ERROR,message:'recourse not found'});
})

app.use((error, req, res, next)=>{
    res.status(error.statusCode || 500).json({status:error.status, message:error.message});
})





const port = 3000;
app.listen(port,()=>{
    console.log('start server at port', port);
})