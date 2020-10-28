
let get_logout = (req, res) => {
	if (req.session.user && req.cookies.user_id) {
		res.clearCookie ('user_id');	
		return res.redirect ('/');
	}
	res.redirect ('login');
}

module.exports = {
	get_logout
}
