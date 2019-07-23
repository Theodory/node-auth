var express = require('express');
var router = express.Router();
var usersValidator = require('../Validations/users');
var userController = require('../controllers/userController');
const passport = require('passport');

router.get('/', userController.index);

router.post('/',usersValidator.user,userController.register);
router.post('/login',usersValidator.login, userController.login);

router.get('/logout', userController.logout);

module.exports = router;