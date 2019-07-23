var express = require('express');
var router = express.Router();
var usersValidator = require('../Validations/users');
var userController = require('../controllers/userController');
const passport = require('passport');

router.get('/', userController.index);

router.post('/',usersValidator.user,userController.register);
router.post('/login',usersValidator.login, passport.authenticate('local-signin', {
        successRedirect: '/home',
 
        failureRedirect: '/auth'
    }
 
));

module.exports = router;