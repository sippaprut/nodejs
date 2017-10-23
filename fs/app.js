const fs = require('fs');

const notes = require('./notes.js');

const _ = require('lodash');

//Get information system
const os = require('os');
const user = os.userInfo();
const myComputer = JSON.stringify(os.cpus() ) ;

const template = myComputer;

console.log( `Result ${notes.add(9,-2)}` )

var filteredArray = _.uniq(['Mike']);
console.log(filteredArray);

// var res = notes.addNotes();
// console.log(res);

//Create file
// fs.appendFile('greeting.txt' , `My os is ${template}!` , (err) => {
// 	if (err) {
// 		console.log("error")
// 	}
// });