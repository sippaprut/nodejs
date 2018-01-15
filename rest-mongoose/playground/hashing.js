const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

let data = {
	id : 10
};

let token = jwt.sign( data , 'Get start JWT');
//console.log(token);

let isVerify = jwt.verify(token , 'Get start JWT');
console.log("Data:" , isVerify );
// let message = "I am programmer";
// let hash = SHA256(message).toString();

// console.log("Message: " , message);
// console.log("Hash: " , hash);