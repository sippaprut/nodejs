const asyncAdd = ( a , b ) => {
	return new Promise( (resolve , reject ) => {
		setTimeout( () => {
			if ( typeof a === "number" & typeof b === "number" ) {
				resolve( a + b );
			}
			else {
				reject("Please provide number");
			}
		} , 2500 );
	});
};

asyncAdd(5 , 20)
.then( (res) => {
	console.log("Result: " , res);
	return asyncAdd(res , 10)
})

.then( (result) => {
	console.log("Should be " , result );
})

.catch( ( error ) => {
	console.log( "Error: " , error);
})



// const somePromise = new Promise ( (resolve , reject) => {
// 	setTimeout( () => {
// 		reject('Error reject');
// 		//resolve('It works in resolve')
// 	} , 2000)
// });

// somePromise
// .then( (message) => {
// 	console.log(message);
// }, (error) => {
// 	console.log(error);
// });

