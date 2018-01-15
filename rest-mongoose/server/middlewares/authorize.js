const {User} = require('./../models/user.js');

const authorize = (req , res , next) => {
	let token = req.header('jwt-auth');
		
	User.findByToken(token)
	.then((user) => {
		req.user = user;
		req.token = token;
		next();
	})
	.catch( (err) => {
		res.status(400).send({ message : err});
	});
};

module.exports = authorize;