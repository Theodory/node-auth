
var indexRouter = require('./index');
var usersRouter = require('./users');
var authentication = require('./register');

module.exports = (app) => {
	app.use('/', indexRouter);
	app.use('/auth', authentication);
	
}