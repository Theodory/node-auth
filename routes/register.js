var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

router.get('/', userController.index);

router.post('/',  [
  // username must be an email
  check('email').isEmail(),
  check('email').isEmail(),
  check('email').isEmail(),
  // password must be at least 5 chars long
  check('password').isLength({ min: 6 }).withMessage('must be at least 6 chars long')
    .matches(/\d/).withMessage('must contain a number'),
],userController.register);

module.exports = router;