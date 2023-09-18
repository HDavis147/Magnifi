// function to do authorization check for vaild user for our routes
const withAuth = (req, res, next) => {
	if (!req.session.logged_in) {
		res.redirect('/userlogin');
	} else {
		next();
	}
};

module.exports = withAuth;
