const bcrypt = require('bcrypt');

//hash utility
function hashed (password) {
	const salt = bcrypt.genSaltSync ();
	return bcrypt.hashSync (password, salt);
}

function validate (password, hashed_pass) {
	return bcrypt.compareSync (password, hashed_pass);
}


module.exports = {
	hashed,
	validate
}
