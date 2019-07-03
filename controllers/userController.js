const { check, validationResult } = require('express-validator');


exports.index  =  (req, res) => {
	res.render('register',{errors: req.flash('errors')});
}

//register
exports.register = (req, res) => {

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		let customErrors = [];
		// return res.status(422).json({ errors: errors.array() });
		if(errors['errors'].length == 1){
			customErrors.push(errors["errors"][0]["msg"]);
			req.flash('errors', customErrors);
			return res.send(customErrors);
		}else{
			 for(let key in errors["errors"]){
			 	customErrors.push(errors["errors"][key]["msg"]);
			 }
			 req.flash('errors', customErrors);
			 return res.send(customErrors);
			

		}
		
	}
	res.send(req.body);
}