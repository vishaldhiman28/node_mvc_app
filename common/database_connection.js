const mongodb       = require ('mongodb');
const _dbconfig     = require ('./config/dbconfig');
const mongo_client  = mongodb.MongoClient;

let _db;

function db_connect (callback) {
	mongo_client.connect (_dbconfig.url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, database) => {
		if (err) {
			return callback (null, err);
		}

		_db = database.db (_dbconfig.name);

		callback(_db, null);
	});
}
	
function get_db () {
	return _db;		
}
function close_conn () {
	_db.close();
}

module.exports = {
	db_connect,	
	get_db,
	close_conn
}
