return [
  // username must be an email
  check('fname').isString().isLength({ min: 3 }).withMessage('must be at least 3 characters long'),
  check('lname').isString().isLength({ min: 3 }).withMessage('must be at least 3 characters long'),
  check('email').isEmail().withMessage('Email is invalid'),,
  check('password').isLength({ min: 6 }).withMessage('must be at least 6 chars long')
    .matches(/\d/).withMessage('must contain a number'),
]