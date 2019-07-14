var express = require('express');
var router = express.Router();

var usersValidator = require('../Validations/users');
var userController = require('../controllers/userController');

router.get('/', userController.index);

router.post('/',usersValidator.user,userController.register);
router.post('/',usersValidator.user,userController.register);

module.exports = router;