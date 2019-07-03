const { check, validationResult } = require('express-validator');

exports.index  =  (req, res) => {
	res.render('register');
}

//register
exports.register = (req, res) => {

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// return res.status(422).json({ errors: errors.array() });
		return res.send({ messages:  req.flash('info') });
	}
	res.send(req.body);
}