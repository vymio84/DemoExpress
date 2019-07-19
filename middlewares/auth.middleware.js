var db = require('../db.js');
module.exports = {
	requireAuth: (req, res, next) => {
		// console.log(req.cookies, req.signedCookies);
		if (!req.signedCookies.userId) {
			res.redirect('/auth/login');
			return;
		}
		var user = db
			.get('users')
			.find({ id: req.signedCookies.userId })
			.value();
		console.log(user);
		if (!user) {
			res.redirect('/auth/login');
			return;
		}
		res.locals.user = user;
		next();
	}
};
