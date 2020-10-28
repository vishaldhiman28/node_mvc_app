const user_model = require ('../models/user_model');
const { hash_util, email_util } = require ('./utils');

const validate_input = (data) => {
	let { username, password, password_2, name, mobile_number } = data;
	
	let mob_number_regx = /^\d{10}$/;
	let msg          = null;
	let is_valid        = false;
	
	if (!username || !email_util.validate_email(username))
		msg = "username should be email.";

	if (!password || !password_2) 
		msg = "password can not be empty.";

	if( password!==password_2)
		msg = "both password should be same."

	if (!name)
		msg = "name can not be empty.";
	
	if (mobile_number && !mobile_number.match (mob_number_regx))
		msg = "mobile number should contains total 10 digits only.";

	if (msg)
		return {
			is_valid,
			msg
		}

	is_valid = true;

	return {
			username,
			password,
			name,
			mobile_number,
			is_valid
	}		
}

let get_signup = (req, res) => {
	return res.render ('signup', { title : "SignUp" });
};

let post_signup = (req, res) => {
	let validated_data = validate_input (req.body);

	if (!validated_data.is_valid) {
		return res.render ('signup', { title : "SignUp", msg : validated_data.msg });
	}

	user_model.find_user (validated_data.username, (user_data, error) => {
		if (error) {
			console.log ('Error finding user. Error : ' + error);

			return res.render('signup', { title : "SignUp", msg: "Some error occured. Try Again."});
		}

		if (user_data) 
			return res.render ('signup', { title : "SignUp", msg: "Username already exist."});
		
		validated_data.password = hash_util.hashed (validated_data.password);

		user_model.create_user (validated_data, (user_data, error) => {
			if (error){
				return res.render('signup', { title : "SignUp", msg: "Some error occured. Try Again."});
			}
			
			req.session.user = user_data;
			res.redirect ('/landing_page');
		});
	});
}

module.exports = {
	get_signup,
	post_signup
}
