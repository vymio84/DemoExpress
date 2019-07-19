var db = require('../db.js');
var md5 = require('md5');
module.exports = {
	login: function(req, res) {
		res.render('auth/login.pug');
	},
	postLogin: function(req, res, next) {
		var email = req.body.email;
		var password = req.body.password;
		var user = db
			.get('users')
			.find({ email: email })
			.value();

		if (!user) {
			res.render('auth/login', {
				errors: ['User does not exist'],
				values: req.body
			});
			return;
		}
		var hashPassword = md5(password);
		if (user.password !== hashPassword) {
			res.render('auth/login', {
				errors: ['Wrong password'],
				values: req.body
			});
			return;
		}
		res.cookie('userId', user.id, {
			signed: true
		});
		res.redirect('/users');
	}
};
