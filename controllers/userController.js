const { check, validationResult } = require('express-validator');
const models = require('../models/');
const bcrypt = require('bcrypt');
const passport = require('passport');



exports.index  =  (req, res) => {
	res.render('register',{errors: req.flash('errors')});
}


//register
exports.login = (req, res) => {
	let email = req.body.email;

	let password = bcrypt.hashSync(req.body.password, 10);

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		let customErrors = [];
		// return res.status(422).json({ errors: errors.array() });
		if(errors['errors'].length == 1){

			customErrors.push(errors["errors"][0]["msg"]);
			req.flash('errors', customErrors);
			return res.redirect('/auth');

		}else{
			for(let key in errors["errors"]){
				customErrors.push(errors["errors"][key]["msg"]);
			}
			req.flash('errors', customErrors);
			return res.redirect('/auth');
		}
		
	}
	res.redirect('/home');

	

}

exports.register = (req, res) => {
	passport.authenticate('local-signin', {
		successRedirect: '/home',

		failureRedirect: '/auth'
	});
}

exports.logout = (res,req) => {
		req.logout();
		res.redirect('/');
	
}