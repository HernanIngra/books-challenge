const { body } = require('express-validator');
const path = require('path');

module.exports = [
    body('name')
        .notEmpty()
        .withMessage('Write a name'),

    body('email')
        .notEmpty().withMessage('Write an email').bail()
        .isEmail().withMessage('Write a valid email'),
    body('country')
        .notEmpty()
        .withMessage('Write a country'),
    body('category')
        .notEmpty()
        .withMessage('Choose a category'),

    body('password').notEmpty().withMessage('Write a password')

]