var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/home',isLoggedIn ,function(req, res, next) {
	res.locals.user = req.session.user;
	res.render('home');
  //res.send('home_another');
});

function isLoggedIn(req, res, next) {

	if (req.isAuthenticated())

		return next();

	res.redirect('/auth');

}

module.exports = router;
