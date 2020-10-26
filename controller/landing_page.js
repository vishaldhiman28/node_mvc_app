
module.exports = {
	get_landing : (req,res) => {
			if (req.session.user && req.cookies.user_id) {
				res.redirect ("landingPage", { name : req.session.user.name } );
			}
			else {
				res.redirect ("login");
			}
	}
}
