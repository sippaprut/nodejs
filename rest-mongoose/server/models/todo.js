const mongoose = require('mongoose');

const Todos = mongoose.model('Todos' , {
	text : {
		type : String ,
		required : true
	} ,
	completed : {
		type : Boolean ,
		default : false
	} ,
	created : {
		type : Number ,
		required : true
	}
});


module.exports = {
	Todos
}