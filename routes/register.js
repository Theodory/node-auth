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
}));

router.get('/logout',isLoggedIn, userController.logout);

function isLoggedIn(req, res, next) {

	if (req.isAuthenticated())

		return next();

	res.redirect('/auth');

}

module.exports = router;