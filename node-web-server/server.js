const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials( __dirname + '/views/partials' );
app.set('view engine' , 'hbs');

//Register helper for global
hbs.registerHelper('getCurrentYear' , () => {
	return  new Date().getFullYear()
});

hbs.registerHelper('screenUpper' , (text) => {
	return text.toUpperCase();
})



//Global middleware
app.use( ( req , res , next ) => {
	let now = new Date().toString();
	let logs = now + " :" + req.method + " " + req.url;

	fs.appendFile('server.log' , logs + '\n' , (err) => {
		if ( err ) {
			console.log('Unable to append to server.log')
		}
	});

	console.log( now + " :" + req.method + " " + req.url );

	next();
});

app.use( (req , res , next ) => {
	try {
		if ( parseInt(req.query.a) === 1 ) {
			throw new('Please auth');
		}
		next();
	}
	catch(e) {
		res.render('error.hbs');
	}
});

app.use('/about' , (req , res , next) => {
	console.log("Middle ware about us");
	next();
	//res.sendStatus(401)
})


//Set middleware for get path
app.use( express.static(__dirname + '/public') );


app.get('/' , ( req , res) => {

	let data = {
		pageTitle : 'Welcome to home page',
		name : 'Sippaprut' ,
		age : 30 
	};

	res.render('home.hbs' , data );

	//res.send('<h1>Hello Express</h1>');
	// res.send({
	// 	name : 'Sippaprut' ,
	// 	age : 30 ,
	// 	skill : ['php' , 'vue' , 'node']
	// });
});


app.get('/about' , ( req , res) => {
	res.render('about.hbs' , {
		pageTitle : 'About page',
		name : 'Sippaprut' 
	});
});

app.get('/bad' , (req , res) => {
	res.send({
		status : '404' ,
		message : 'Unable to handle server'
	})
});

app.listen(port , () => {
	console.log('Server is upon in port ' + port);
	//console.log('Vue root is ' , vueOptions.rootPath )
});