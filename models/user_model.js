let db = require("../database_connection");

module.exports = {
	create_user : (data, callback) => {
			db.get_db().collection ('users').insertOne ( {
				username      : data.username,
				password      : data.password,
				name          : data.name,
				mobile_number : data.mobileNumber
                        }, (error, res) => {
				if (error) {
					console.log(error)
					callback ( { msg : 'error' } );
				}
				else {
					callback (res.ops[0]);		
				}
			});
	},
	find_user   : (username, callback) => {
			db.get_db().collection ('users').findOne ( { 
				username : username 
			}, (error, res) => {
				if (error) {
					console.log(error);
					callback ( { msg : 'error' } );
				}
				if(!res) {
					callback ( { msg : 'null' } );
				}
				else  {
					callback (res);
				}
			});
	}
}
