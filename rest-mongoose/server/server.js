const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');


const {Todo} = require('./models/todo');

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());// support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.post('/todos' , ( req , res , next ) => {
	res.send(req.body)
	console.log(req);
});


app.listen(port , () => {
	console.log('Server is upon in port' + port);
});





