const mongodb       = require ('mongodb');
const db_config     = require ('./config/dbconfig');
const mongo_client  = mongodb.MongoClient;

let db_;
function db_connect (callback) {
	mongo_client.connect (db_config.url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, database) => {
        			if(err) {
                			return console.error(err);
        			}
        		db_ = database.db ('dbprojectA');
			console.log ("Connected to database.");
			callback();
			});
}
	
function get_db () {
	return db_;		
}
function close_conn () {
			db_.close();
}

module.exports = {
	db_connect,	
	get_db,
	close_conn
}
