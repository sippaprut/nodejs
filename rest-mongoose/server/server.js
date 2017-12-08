const express = require('express');
const bodyParser = require('body-parser');


const { mongoose } = require('./db/mongoose');


const {Todos} = require('./models/todo');

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());// support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.post('/todos' , ( req , res , next ) => {
	let newData = new Todos({
		text : req.body.text ,
		created : req.body.created
	});

	newData.save().then( (result) => {
		res.send(result);
	} , ( {message} ) => {
		res.status(400).send({
			status : false ,
			message : message
		});
	})
});

app.get('/todos' , (req , res , next ) => {

	let params = {};

	if ( typeof req.query.id !== "undefined" ) {
		params._id = req.query.id;
	}

	Todos.find(params).then( (result) => {
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




app.listen(port , () => {
	console.log('Server is upon in port' + port);
});

module.exports = {app};



