const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '13456789';

//Generate password
// bcrypt.genSalt(10 , (err , salt) => {
// 	bcrypt.hash(password , salt , (err , hash) => {
// 		console.log(hash);
// 	});
// });

//Authen password
let hashpassword = '$2a$10$zuisgOsSghRNq533rT2eQuzR0XoQy83Q7TJxqyOczMBMZanEL0hCu';
bcrypt.compare( password , hashpassword , (err , res) => {
	console.log("Response " , res);
	console.log("Error " , err);
});


// let data = {
// 	id : 10
// };

// let token = jwt.sign( data , 'Get start JWT');
// //console.log(token);

// let isVerify = jwt.verify(token , 'Get start JWT');
// console.log("Data:" , isVerify );
// let message = "I am programmer";
// let hash = SHA256(message).toString();

// console.log("Message: " , message);
// console.log("Hash: " , hash);