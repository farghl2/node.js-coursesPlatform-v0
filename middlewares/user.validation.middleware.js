const {body} = require('express-validator');

const userValidate = [
    body('firstname').notEmpty().withMessage('firstName required').isLength({min:4, max:20}),
    body('lasttname').notEmpty().withMessage('lastName required').isLength({min:4, max:20}),
    body('email').notEmpty().withMessage('email required').isLength({min:4, max:20}).isEmail(),
    body('password').notEmpty().withMessage('password required').isLength({min:4, max:12}).isStrongPassword()
]

module.exports = userValidate;