const { MongoClient, ObjectID } = require('mongodb');

const DBLINK = 'mongodb://localhost:27017/test';

const _ = require('lodash');

const yargs = require('yargs');







MongoClient.connect( DBLINK , (err , db) => {
	if ( err ) {
		return console.log("Could not connect to database.");
	}

	db.collection('Users').findOneAndUpdate(
		{
			_id : new ObjectID('5a068f2fd106d70e97ec9a44')
		} ,
		{
			$set : {
				name : 'Jay Botoy'
			} ,
			$inc : {
				age : +2
			}
		} ,
		{
			returnOriginal : false
		}

	).then( (res) => {
		console.log(res);
	});

	db.close();
	

});


