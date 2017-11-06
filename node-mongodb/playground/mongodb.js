const MongoClient = require('mongodb').MongoClient;

const DBLINK = 'mongodb://localhost:27017/test';

const insertData = (db , callback ) => {
	let collection = db.collection('Todos');
	collection.insert({ text : 'test Add value'} , (err , result ) => {
		//callback
		if ( err ) {
			return console.log(err);
		}
		console.log("Insert is success.");
		callback(result);
	});
}

MongoClient.connect( DBLINK , (err , db) => {
	if ( err ) {
		return console.log("Could not connect to database.");
	}
	console.log("connect working");

	insertData(db , (res) => {
		console.log(res)
		db.close();
	});

});


