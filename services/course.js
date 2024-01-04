const asyncWraber = require('../middlewares/asyncWraber');
const CourseModel = require('../models/course.model');
const appError = require('../utils/appError');
const httpResStatusText = require('../utils/httpResStatusText');

const {validationResult} = require('express-validator')

exports.addCourse=asyncWraber( (req, res, next)=>{
    const error = validationResult(req);
    
    if(!error.isEmpty()){
        const error = appError.create(500, httpResStatusText.FAIL,error.array())
        return next(error);
    }
    let price = req.body.price;
    let name = req.body.name;
    const newCourse = new CourseModel({name:name,price: price})
    newCourse.save().then((doc)=>{
        return res.status(201).json({status:httpResStatusText.SUCCESS,data:{course:newCourse}});
    })
})

exports.getAllCourses =asyncWraber( 
    async (req, res)=>{
    const {page =1,limit = 10} = req.query;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber -1) *limitNumber;
    const courses = await CourseModel.find({},{"__v":false}).skip(skip).limit(limitNumber).exec()
   return res.status(200).json({status:httpResStatusText.SUCCESS,data:{courses}});
} )

exports.getcourse =asyncWraber( async (req, res, next)=>{
    const courseId = req.params.courseId
    const course = await CourseModel.findOne({_id:courseId});
   
    if(!course){
 
       const error = appError.create(404,httpResStatusText.FAIL,'resource not found')
    
        return next(error)
      
    }
    else
    return res.status(200).json({status:httpResStatusText.SUCCESS,data:{course}});
})

exports.deleteCourse =asyncWraber(async (req, res)=>{
    const courseId = req.params.courseId;
     await CourseModel.deleteOne({_id:courseId});
    return res.status(200).json({status:httpResStatusText.SUCCESS, data:null})

})

exports.updateCourse =asyncWraber( async (req, res)=>{
    const courseId = req.params.courseId;
    const data = req.body;
    updateCurentCourse = await CourseModel.updateOne({_id:courseId},{$set:data});
    return res.status(200).json({status:httpResStatusText.SUCCESS,data:{course:updateCurentCourse}});
})