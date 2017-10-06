var user = {
	name : 'Sippaprut' ,
	sayHi : () => {
		console.log(arguments);
		console.log("Hi I'm " + this.name);
	} ,
	sayHiAlt () {
		console.log(arguments);
		console.log("Hi. I'm " + this.name );
	}
}

user.sayHi(1,2,3);