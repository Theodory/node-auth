var app = require('express').express;
const { check, validationResult } = require('express-validator');
var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const models = require('../models/');
const bcrypt = require('bcrypt');


exports.index  =  (req, res) => {
	res.render('register',{errors: req.flash('errors')});
}


//register
exports.login = (req, res) => {
	let email = req.body.email;

	var password = bcrypt.hashSync(req.body.password, 10);

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

	passport.use(new LocalStrategy(
		function(username, password, done) {
			models.User.find({ email: email }, function (err, user) {
				if (err) { return done(err); }
				if (!user) { return done(null, false); }
				if (!user.verifyPassword(password)) { return done(null, false); }
				return done(null, user);
			});
		}
		));

	passport.authenticate('local', { failureRedirect: '/auth' }),
	res.render("home");

}

exports.register = (req, res) => {
	let firstName = req.body.fname;
	let secondName = req.body.lname;
	let pass = req.body.password;
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

	//Hash password
	var hash = bcrypt.hashSync(pass, 10);

	models.User.create({
		firstName : firstName,
		lastName : secondName,
		email : req.body.email,
		password : hash,
	}).then(user => {
		// let sess = req.session;
		// req.session.user = user;
		req.flash('errors', "User stored successifully");
		req.session.regenerate(()=>{
        // Store the user's primary key
        // in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user = user;
        res.locals.user = JSON.stringify(req.session.user);
        return res.render('home')
    });
		//return res.redirect('/auth')
	});
	

}