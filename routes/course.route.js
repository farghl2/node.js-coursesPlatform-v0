const express = require('express');

const {addCourse, getAllCourses, getcourse,deleteCourse, updateCourse} = require('../services/course')
const courseValidate = require('../middlewares/course.validation.middleware');
const router = express.Router();


router.route('/')
.post(courseValidate,addCourse)
.get(getAllCourses)

router.route('/:courseId').get(getcourse).delete(deleteCourse).patch(updateCourse);

module.exports = router;