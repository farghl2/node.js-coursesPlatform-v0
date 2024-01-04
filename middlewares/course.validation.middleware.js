const { body } = require('express-validator');


const  courseValidate=[
   body('name').notEmpty().withMessage('name is required')
    .isLength({ min: 4 }).withMessage('name must be at least 4 characters long'),
    body('price').notEmpty().withMessage('price is required')
]

module.exports = courseValidate;