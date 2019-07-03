const { check, validationResult } = require('express-validator');
const models = require('../models/');


exports.index  =  (req, res) => {
	res.render('register',{errors: req.flash('errors')});
}

//register
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

	models.User.create({
		firstName : firstName,
		lastName : secondName,
		email : req.body.email,
		password : pass,
	}).then(user => {
		req.flash('errors', "User stored successifully");
		req.flash('errors', JSON.stringify(user));
		return res.redirect('/auth');
	});
	

}