const bcrypt = require('bcrypt');

let hash_util    = {};
let email_util   = {};
let session_util = {};

hash_util.hashed = (password) => {
	const salt = bcrypt.genSaltSync ();
	
	return bcrypt.hashSync (password, salt);
}

hash_util.validate = (password, hashed_pass) => bcrypt.compareSync (password, hashed_pass);



email_util.validate_email = (email) => {
	let email_regx =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	
	if (email_regx.test (email))
		return true;
	
	return false;
}

module.exports = {
	hash_util,
	email_util
};
