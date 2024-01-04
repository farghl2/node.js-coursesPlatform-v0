const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    name:String,
    price:String

});


const CourseModel = mongoose.model('Course', CourseSchema);

module.exports = CourseModel;