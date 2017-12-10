//const MongoClient = require('mongodb').MongoClient;

const { MongoClient, ObjectID } = require('mongodb');
const DBLINK = 'mongodb://localhost:27017/test';

const insertData = (db , callback ) => {
	let collection = db.collection('Users');
	collection.insert({ 
		name : 'Alan Parawan' ,
		age : 32 
	} , (err , result ) => {
		//callback
		if ( err ) {
			return console.log(err);
		}

		collection.createIndex( { name : "text" , age : "text"} )
		console.log("Insert is success.");
		callback(result.ops[0]._id.getTimestamp());
	});
}

MongoClient.connect( DBLINK , (err , db) => {
	if ( err ) {
		return console.log("Could not connect to database.");
	}
	console.log("connect working");

	// insertData(db , (res) => {
	// 	console.log(res)
	// 	db.close();
	// });
	
	// db.collection('Users').deleteMany({ age : 31 }).then( (res) => {
	// 	console.log(res);
	// });
	
	// ### $gte selects the documents where the value of the field is greater than or equal to (i.e. >=) a specified value (e.g. value.)
	// db.collection('Users').deleteMany({ age : { $gte : 40 } })
	// .then( (res) => {
	// 	console.log(res);
	// });
	
	//Find age <= 32
	db.collection('Users').findOneAndDelete({ age : { $lte : 32 } })
	.then( (res) => {
		console.log(res);
	});


	db.close();
});


