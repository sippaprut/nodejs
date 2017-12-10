const { MongoClient, ObjectID } = require('mongodb');

const DBLINK = 'mongodb://localhost:27017/test';

const _ = require('lodash');

 const yargs = require('yargs');

 const {argv} = yargs.command( 'find' , 'Find User' , 
 		{
	 		value : {
		 		describe : 'Find value name' ,
		 		demand : true , //required
				alias: 'v'
	 		}
 		}
 )
 .command('count' , 'Count User');

 const command = argv._[0];

const findUser = (db , finds ,  callback ) => {
	let usersDb = db.collection('Users');

	usersDb.find( finds ).toArray( (err , result ) => {
		if ( err ) {
			return console.log(err);
		}
		callback(result);
	});

}

const countUser = (db , callback ) => {
	let usersDb = db.collection('Users');
	usersDb.find().count().then( (total) => {
		callback(total);
	} , (err) => {
		return console.log(err)
	})
}

MongoClient.connect( DBLINK , (err , db) => {
	if ( err ) {
		return console.log("Could not connect to database.");
	}

	// db.collection('Users').find().toArray().then( (result) => {
	// 	console.log('Users');
	// 	console.log(JSON.stringify( result , undefined , 2));
	// } , (err) => {
	// 	console.log("Unable to get Users" , err);
	// })

	if ( command === 'find') {
		// findUser(db , { _id : new ObjectID(argv.value) } , (result) => {
		// 	console.log(JSON.stringify(result , undefined ,  2));
		// 	db.close();
		// });
		
		//let seachValue = { $regex :  `.*${argv.value}.*` };
		let seachValue = { $text : {$search: `${argv.value}` }  };
		findUser(db , seachValue , (result) => {
			console.log(JSON.stringify(result , undefined ,  2));
			db.close();
		});
	}

	else if ( command === 'count') {
		countUser(db , (result) => {
			console.log(`Total users is ${result}`);
		});
	}

	else if ( command === "delete" ) {
		db.collection('Users').deleteMany({ age : 31 }).then( (res) => {
			console.log(res);
		})
	}
	

});


