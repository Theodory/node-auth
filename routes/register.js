var express = require('express');
var router = express.Router();

var usersValidator = require('../Validations/users');
var userController = require('../controllers/userController');

console.log(usersValidator);

router.get('/', userController.index);

router.post('/',usersValidator.user,userController.register);

module.exports = router;