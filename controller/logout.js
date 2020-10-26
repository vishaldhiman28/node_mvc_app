
module.exports = {
	get_logout : (req, res) => {
			if (req.session.user && req.cookies.user_id) {
				res.clearCookie ('user_id');
				res.redirect ("index", { title : "Home" } );
			}
			else {
				res.redirect ('login');
			}
	}
}
