let db = require ("../database_connection");

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

		callback (res.ops[0], null);
	});
};

model.find_user = (username, callback) => {
	db.get_db ().collection ('users').findOne ( { 
		username : username 
	}, (error, res) => {
		if (error)
			return callback (null, error);

		if (!res)
			return callback (null, 'No such user');

		callback (res, null);
	});
};

module.exports = model;
