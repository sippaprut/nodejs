let utils = require('./utils');

it ('should add two numbers' , () => {
	let res = utils.add(33 , 11);

	if ( res !== 44 ) {
		throw new Error('Expected 44, but got ' + res);
	}
});

it ('should be ood number' , () => {
	let res = utils.modNumber(10);

	if ( res !== 0  )
	{
		throw new Error('Expected ood, but got ' + res);
	}
});