const express = require('express');

let app = express();

//Set middleware for get path
app.use( express.static(__dirname + '/public') );

app.get('/' , ( req , res) => {
	//res.send('<h1>Hello Express</h1>');
	res.send({
		name : 'Sippaprut' ,
		age : 30 ,
		skill : ['php' , 'vue' , 'node']
	});
});

app.get('/about' , ( req , res) => {
	res.send('<h1>About us</h1>');
});

app.get('/bad' , (req , res) => {
	res.send({
		status : '404' ,
		message : 'Unable to handle server'
	})
});

app.listen(3000 , () => {
	console.log('Server is upon in port 3000');
});