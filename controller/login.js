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
        else {
                return {
                        username,
                        password
		}
        }
}

module.exports = {
        get_login  : (req, res) => {
                        res.render ('login', { title : "Login" } );
        },
        post_login : (req, res) => {
                        let validated_data      = validate_input (req.body);
                        if (validated_data.msg) {
                                res.redirect ('login', { title : "Login", msg : validated_data.msg } );
                        }
                        let user_data = user_model.find_user (validated_data.username);
                        if (user_data.msg == 'null') {
                                res.redirect ('login', { title : "Login", msg: "Incorrect Username."} );
                        }
			
                      	if (!hash_util.validate (validated_data.password, user_data.password)) {
				res.redirect ('login', { title : "Login", msg: "Wrong Password." } )		
			}
                        req.session.user        = user_data;
                        res.redirect ('landing_page', { name : user_data.name } );
        }
}
    
