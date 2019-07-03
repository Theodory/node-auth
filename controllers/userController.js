

exports.index  =  (req, res) => {
	res.render('register');
}

//register
exports.register = (req, res) => {
	res.send(req.body);
}