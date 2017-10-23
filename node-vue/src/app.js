let Vue = require('vue')

let createApp = (context) => {
	return new Vue({
	    data: {
	      url: context.url
	    },
	    template: `<div>The visited URL is: {{ url }}</div>`
	});
}

module.exports = createApp;