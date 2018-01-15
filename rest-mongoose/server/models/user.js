const mongoose = require('mongoose');

const validator = require('validator');

const jwt = require('jsonwebtoken');

const {SHA256} = require('crypto-js');

const _ = require('lodash');

const UserSchema = new mongoose.Schema({ 
	email : {
		type : String ,
		required : true ,
		unique : true ,
		validate : {
			validator : (v) => {
				return validator.isEmail(v);
			},
			message: '{VALUE} is not a valid email'
		}
	} ,
	password : {
		type : String ,
		required : true ,
		minlength : 8
	} ,
	tokens : [{
		access: {
			type: String ,
			required : true
		} ,
		token: {
			type: String ,
			required : true
		}
	}]
});

UserSchema.methods.toJSON = function() {
	let user = this;
	return _.pick(user.toObject() , ['_id' , 'email']);
}

UserSchema.methods.generateToken = function() {
	let user = this;
	let access = 'authen';
	let data = {
		_id : user._id.toHexString() ,
		access
	};

	let token = jwt.sign(data , 'user-token123').toString();

	user.tokens.push({ token , access });

	return user.save().then(() => {
		return token;
	});

};

UserSchema.statics.findByToken = function(token) {
	let user = this;
	let decoded;

	try {
		decoded = jwt.verify(token , 'user-token123');
	} catch (e) {
		return Promise.reject('Can not found user');
	}

	return user.findOne({
		_id : decoded._id ,
		'tokens.token' : token ,
		'tokens.access' : decoded.access
	})
}


const User = mongoose.model('Users' , UserSchema );


module.exports = {
	User
}