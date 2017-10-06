console.log('starting password manager');

const storage = require('node-persist');
storage.initSync();

//storage.setItemSync('name' , 'Sippaprut');

var name = storage.getItemSync('name');
console.log('Save name is ' + name)

// storage.setItemSync('accounts' , [{
// 	username : 'Sippaprut' ,
// 	blance : 0
// }]);

// storage.setItemSync('accounts', [{
// 	username: 'Andrew',
// 	balance: 0
// }]);

//const accounts = storage.getItemSync('accounts');
//const account = storage.getItemSync('accounts');


// push on a new accounts
// accounts.push({
// 	username: 'Jen',
// 	balance: 75
// });

// save using setItemSync
// storage.setItemSync('accounts', accounts);

//console.log(accounts);