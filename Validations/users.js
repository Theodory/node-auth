const { check, validationResult } = require('express-validator');

exports.user = [
  // username must be an email
  check('fname').isString().isLength({ min: 3 }).withMessage('First Name must be at least 3 characters long'),
  check('lname').isString().isLength({ min: 3 }).withMessage('Last Name must be at least 3 characters long'),
  check('email').isEmail().withMessage('Email is invalid'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars long')
    .matches(/\d/).withMessage('must contain a number'),
];