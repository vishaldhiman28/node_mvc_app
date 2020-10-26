const user_model = require ('../models/user_model');
const hash_util  = require ('./hash_util');

const validate_input = (data) => {
	let { username, password, name, mobile_number } = data;
	let mob_number_regx                             = /^\d{10}$/;
	if (!username) {
		return { msg : "username should be email" };
	}
	else if (!password) {
		return { msg : "password can not be empty" };
	}
	else if (!name) {
		return { msg : "name can not be empty" };
	}
	else if (mobile_number && !mobile_number.match (mob_number_regx)) {
		return { msg : "mobile number should contains total 10 digits only"}
	}
	else {
		return {
			username,
			password,
			name,
			mobile_number
		}		
	}
}

module.exports = {
	get_signup  : (req, res) => {
			res.render ('signup', { title : "SignUp" } );
	},
	post_signup : (req, res) => {
			let validated_data      = validate_input (req.body);
			if (validated_data.msg) {
				res.render ('signup', { title : "SignUp", msg : validated_data.msg } );
			}
			validated_data.password = hash_util.hashed (validated_data.password);
			user_model.find_user (validated_data.username, (user_data) => {
				if (user_data.msg == 'null') {
          				user_model.create_user (validated_data, (user_data) => {
						if (user_data.msg){
							res.render('signup', { title : "SignUp", msg });
						}
						req.session.user = user_data;
          					console.log("hi");
						res.render ('landing_page', { name : user_data.name } );
					});
				}
				else{
					res.render ('signup', { title : "SignUp", msg: "Username already exist."} );
				}
			});
	}
}
