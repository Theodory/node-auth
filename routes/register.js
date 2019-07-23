var express = require('express');
var router = express.Router();
var usersValidator = require('../Validations/users');
var userController = require('../controllers/userController');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

router.get('/', userController.index);

router.post('/',usersValidator.user,userController.register);
router.post('/login',usersValidator.login, passport.authenticate('local', { failureRedirect: '/auth'}),
	function(req,res){
		return res.redirect('/home');
	});

module.exports = router;