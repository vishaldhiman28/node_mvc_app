let get_landing = (req,res) => {
	if (req.session.user && req.cookies.user_id)
		return res.render ("landing_page");

	res.redirect ("/login");
}

module.exports = {
	get_landing
}

