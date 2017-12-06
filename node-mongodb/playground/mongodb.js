//mongod --dbpath D:\dev\mongo-data
//const MongoClient = require('mongodb').MongoClient;

const { MongoClient , ObjectID } = require('mongodb');

const ObjectId = require('mongodb').ObjectID;

const DBLINK = 'mongodb://localhost:27017/test';

const yargs = require('yargs');
const _ = require('lodash');

let arg = yargs.command('add' , 'Add new text' , {
	text : {
		describe : 'text for insert data' ,
		demand : true , //required
		alias: 'v'
	}
})
.command('update' , 'Update text' , {
	text : {
		describe : 'text for insert data' ,
		demand : true , //required
		alias: 'v'
	} ,
	id : {
		demand : true 
	} 
})
.help()
.argv;

let command = arg._[0];


const insertData = (db , data ,  callback ) => {
	let collection = db.collection('Todos');
	collection.insert( data, (err , result ) => {
		//callback
		if ( err ) {
			return console.log(err);
		}
		console.log("Insert is success.");
		callback(result);
	});
}

const updateData = (db , data , where , callback ) => {
	let collection = db.collection('Todos');
	collection.updateOne( where , { $set: data } , (err , result) => {
		if ( err ) {
			return console.log("Error = " , err);
		}
		console.log("Update is success.");
		callback(result)
	});
}

const findData = (db , items , callback ) => {
	db.collection.find().
}

MongoClient.connect( DBLINK , (err , db) => {
	if ( err ) {
		return console.log("Could not connect to database.");
	}
	
	if ( command === 'add' ) {
		insertData( db , { text : arg.text } , (res) => {
			console.log(res);
			db.close();
		});
	}

	else if ( command === 'update' ) {
		updateData( db , { text : arg.text } , { _id : ObjectId(arg.id)  } , (res) => {
			//console.log(res);
			db.close();
		});
	} 




	// insertData(db , (res) => {
	// 	console.log(res)
	// 	db.close();
	// });

});


