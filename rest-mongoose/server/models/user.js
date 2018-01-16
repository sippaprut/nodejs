const mongoose = require('mongoose');

const validator = require('validator');

const jwt = require('jsonwebtoken');

const {SHA256} = require('crypto-js');

const bcrypt = require('bcryptjs');

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

UserSchema.statics.login = function(email , password ) {
	let user = this;

	return user.findOne({
		email
	})
	.then( (item) => {
		if ( ! item) {
			return Promise.reject("Can not found");
		}

		return new Promise( (resolve , reject) => {
			bcrypt.compare( password , item.password , (err , res) => {
				if ( res) {
					resolve(item);
				}
				else {
					reject('User is not found');
				}
				
			});
		});
	})
}

UserSchema.statics.logout = function(token) {
	let user = this;
	console.log(token)
	return user.update({
		$pull : {
			tokens : {
				token
			}
		}
	});
}

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

UserSchema.pre('save' , function (next) {
	let user = this;

	if (user.isModified('password')) {
		bcrypt.genSalt(10 , (err , salt) => {
			bcrypt.hash(user.password , salt , (err , hash) => {
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}

});


const User = mongoose.model('Users' , UserSchema );


module.exports = {
	User
}