let db = require ("../common/database_connection");

let model = {};

model.create_user = (data, callback) => {
	db.get_db ().collection ('users').insertOne ( {
		username      : data.username,
		password      : data.password,
		name          : data.name,
		mobile_number : data.mobileNumber
	}, (error, res) => {
		if (error)
			return callback (null, error);

		return callback (res.ops[0], null);
	});
};

model.find_user = (username, callback) => {
	db.get_db ().collection ('users').findOne ( { 
		username : username 
	}, (error, res) => {
		if (error)
			return callback (null, error);

		return callback (res, null);
	});
};

module.exports = model;
