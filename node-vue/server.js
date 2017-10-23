let Vue = require('vue')
let server = require('express')();
let fs  = require('fs');
let renderer = require('vue-server-renderer').createRenderer({
	template : fs.readFileSync('./index.template.html', 'utf-8')
});

let createApp = require('./src/app');

let port = process.env.PORT || 3000;

server.get('*' , (req , res , next) => {
	let app = createApp({ url : req.url  });

	//renderer.renderToString(app, context, (err, html) => {
	renderer.renderToString(app , (err , html) => {
	    if (err) {
	      res.status(500).end('Internal Server Error')
	      return
	    }
	    res.end(html);
	 })
});

server.listen(port , () => {
	console.log('Server is upon in port ' + port);
});