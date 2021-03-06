require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
//const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');


const {Todos} = require('./models/todo');
const {User} = require('./models/user');

const port = process.env.PORT || 3000;
const app = express();
const authorize = require('./middlewares/authorize.js');
const _ = require('lodash');

app.use(bodyParser.json());// support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.post('/todos' , ( req , res , next ) => {
	let newData = new Todos({
		text : req.body.text ,
		created : req.body.created
	});

	newData.save().then( (result , _id ) => {
		result._id = _id;
		res.send(result);
	} , ( {message} ) => {
		res.status(400).send({
			status : false ,
			message : message
		});
	})
});

app.get('/todos' , (req , res , next ) => {

	// let params = {};

	// if ( typeof req.query.id !== "undefined" ) {
	// 	params._id = req.query.id;
	// }
	Todos.find().then( (result) => {
		if ( result.length == 0 ) {
			res.status(404).send(result);
			return ;
		}
		res.send({result});
	} , 
	(err) => {
		res.status(404).send({
			status : false ,
			err
		});
	}).catch( (e) => {
		res.status(404).send({
			status : false ,
			err
		});
	}) ; 
});

app.get('/todo/:id' , (req , res , next) => {
	
	if ( mongoose.Types.ObjectId.isValid(req.params.id) === false ) {
		res.status(401).send({
			message : 'ID is invalid'
		});
	}

	Todos.findById(req.params.id).then( (data) => {
		if ( data == null ) {
			res.status(404).send({
				result : [] ,
				message : 'Todo is not found'
			});
			return ;
		}
		res.send({
			result : data
		});
	} , (err) => {
		res.status(400).send(err);
	})
});

app.delete('/todo/:id' , (req , res , next) => {

	if ( mongoose.Types.ObjectId.isValid(req.params.id) === false ) {
		res.status(401).send({
			message : 'ID is invalid'
		});
	}

	Todos.findByIdAndRemove(req.params.id).then( () => {
		res.status(200).send({
			message : 'Todo is deleted'
		});
	} , (err) => {
		res.status(400).send(err);
	});
});

app.patch('/todo/:id' , (req , res ) => {

	if ( mongoose.Types.ObjectId.isValid(req.params.id) === false ) {
		res.status(401).send({
			message : 'ID is invalid'
		});
	}

	Todos.findByIdAndUpdate(req.params.id , { $set : req.body } , { new: true }).then( (result) => {
		res.status(200).send(result);
	} , (err) => {
		res.status(400).send(err);
	});
});

app.post('/user/' , (req , res) => {
	const user = new User(req.body);

	user.save()
	.then( (result , _id ) => {
		result.token = () => {
			return user.generateToken();
		}
		return result;
	})
	.then( (result) => {
		result.token().then((token) => {
			res.status(200).header('jwt-auth' , token  ).send({
				_id : result._id
			});
		});
	})
	.catch( (err) => {
		res.status(400).send({ message : err});
	});
});

//authorize is middleware
app.get('/user/me' , authorize , (req , res) => {
	res.status(200).send(req.user);
});


//login
app.post('/user/login' , (req , res) => {
	let data = _.pick(req.body , ['email' , 'password']);
	User.login(data.email , data.password )
	.then((user) => {
		user.generateToken().then((token) => {
			res.status(200).header('jwt-auth' , user.tokens.token  ).send(user);
		});
	})
	.catch( (err) => {
		res.status(400).send({ message : err});
	});

});

//logout
app.delete('/user/me/token' , authorize ,  (req , res) => {
	User.logout(req.token)
	.then( (result) => {
		if ( result.nModified == 0) {
			res.status(401).send();
		}


		res.status(200).send({
			status : 1
		});
	})
	.catch( (err) => {
		res.status(400).send({ message : err});
	});
});




app.listen(port , () => {
	console.log('Server is upon in port' + port);
	console.log("Database name is " ,  process.env.MONGODB_URI);
});

module.exports = {app};



