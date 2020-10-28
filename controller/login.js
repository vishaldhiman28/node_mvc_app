const user_model = require ('../models/user_model');
const { hash_util, email_util } = require ('./utils');

const validate_input = (data) => {
	let { username, password } = data;
	
	let msg      = null;
	let is_valid = false;
	
	if (!username || !email_util.validate_email (username))
		msg = "username should be email";

	if (!password)
		msg = "password can not be empty";

	if (msg)
		return {
			is_valid,
			msg
		}

	is_valid = true;

	return {
		username,
		password,
		is_valid
	};
}

let get_login = (req, res) => {
	return res.render ('login', { title : "Login" });
};

let post_login = (req, res) => {
	let validated_data = validate_input (req.body);

	if (!validated_data.is_valid) {
		return res.render ('login', { title : "Login", msg : validated_data.msg });
	}
	user_model.find_user (validated_data.username, (user_data, error) => {
		if (error) {
			console.log ('Error finding user. Error : ' + error);

			return res.render ('login', { title : "Login", msg: "Some error occured. Try Again."});
		}

		if (!user_data)
			 return res.render ('login', { title : "Login", msg: "Incorrect Username."});

		if (!hash_util.validate (validated_data.password, user_data.password)) {
			return res.render ('login', { title : "Login", msg: "Wrong Password." });
		}

		req.session.user = user_data;
		res.redirect ('/landing_page');
	});
};

module.exports = {
	get_login,
	post_login
};

