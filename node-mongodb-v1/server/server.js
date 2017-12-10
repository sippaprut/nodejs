const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var promise = mongoose.connect('mongodb://localhost:27017/TodoApp' , {
	useMongoClient : true
});

let Users = mongoose.model('Users' , {
	name : {
		type : String ,
		required : true ,
		trim : true
	} ,
	email : {
		type : String ,
		required : true ,
		trim : true
	} ,
	password : {
		type : String ,
		required : true  ,
		validate : {
			validator(v) {
            	return v === this.confirmPassword ;
          	},
          	message: 'Field password is not a match password!'
		} ,
		minlength : 8
	} ,
	confirmPassword : {
		type : String ,
		minlength : 8,
		validate : {
			validator(v) {
            	return v === this.password ;
          	},
          	message: 'Confirm Password is not a match password!'
		} ,
		required : true
	}
});

let newUser = new Users({
	name : 'John Parawan' ,
	email : 'sippaprut@gmail.com' ,
	password : '12345678' ,
	confirmPassword : '123456789'
});

newUser.save().then( (res) => {
	console.log( JSON.stringify(res , undefined , 2));
} , (e) => {
	console.log(JSON.stringify(e , undefined , 2))
});

// let Todos = mongoose.model('Todos' , {
// 	text : {
// 		type : String
// 	} ,
// 	completed : {
// 		type : Boolean
// 	} ,
// 	completedAt : {
// 		type : Number
// 	}
// });

// let newData = new Todos({
// 	text : 'Play games ps4' ,
// 	completed : false ,
// 	completedAt : Date.now()
// });

// newData.save().then( (res) => {
// 	console.log('Saved todo' , res )
// } , (e) => {
// 	console.log('Unable to save todo')
// });

