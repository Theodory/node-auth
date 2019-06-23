
var indexRouter = require('./index');
var usersRouter = require('./users');
var authentication = require('./authentication');

module.exports = (app) => {
	app.use('/', indexRouter);
	app.use('/users', usersRouter);
	app.use('/authentication', authentication);
}