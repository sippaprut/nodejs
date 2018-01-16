const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todos} = require('./../models/todo');
const {User} = require('./../models/user');


describe('POST /todos' , () => {
	it ('should create a new todo' , (done) => {
		let post = {
			text : 'Test Todos mocha' ,
			created : 1512642275141
		};

		request(app)
		.post('/todos')
		.send(post)
		.expect(200)
		.expect( (res) => {
			expect(res.body.text).toBe(post.text);
			expect(res.body.created).toBe(post.created);
		})
		.end( (err , res) => {
			if (err)  {
				return done(err);
			}
			done();
			// Todos.find().then( (todos) => {
			// 	//expect(todos.length).toBe(1);
			// 	expect(todos[0].text).toBe(post.text);
			// 	done();
			// }).catch( (e) => done(e));
		});

	});

	it ('should not create a new todo' , (done) => {

		request(app)
		.post('/todos')
		.send({  })
		.expect(400)
		.end( (err , res) => {
			if (err)  {
				return done(err);
			}
			done();
			// Todos.find().then( (data) => {
			// 	expect(data.length).toBe(0);
			// 	done();
			// }).catch( (e) => done(e) )

		});
	});
});

describe('GET /todos' , () => {
	it ('should get a Todo lists' , (done) => {
		request(app)
		.get('/todos')
		.expect(200)
		.end( (err , res) => {
			if (err) return done(err);
			done();
		});
	});

	// it ( 'should get 404 error when can not found todo' , (done) => {
	// 	request(app)
	// 		.get('/todos')
	// 		.query( { id : '5a2a4ea253c31d3ae8e9a1e8' } )
	// 		.expect(404)
	// 		.end( (err , res) => {
	// 			if (err) return done(err);
	// 			done();
	// 		});
	// });
});

describe('GET /todo/{ID}' , () => {
	it ( 'should be error if id equal empty' , (done) => {
		request(app)
		.get('/todo/')
		.expect(404)
		.end( (err , res) => { 
			if (err) return done(err);
			done();
		})
	});

	it ( 'should be error if id is invalid'  , (done) => {
		request(app)
		.get('/todo/123')
		.expect(401)
		.end( (err , res) => {
			if (err) return done(err);
			expect(res.body.message).toBe('ID is invalid');
			done();
		})
	});

	it ('should be error when Todo is not found' , (done) => {
		let id = '5a2391bde8fbd304c14e28a8';
		request(app)
		 .get(`/todo/${id}`)
		 .expect(404)
		 .end( (err , res) => {
		 	if (err) return done(err);
		 	expect(res.body.result.length).toBe(0);
		 	
		 	expect(res.body.message).toBe('Todo is not found');
		 	done();
		 })
	});


	it ('should get a One Todo' , (done) => {
		Todos.findOne({}).sort({ _id : -1 }).then( (result) => {
			request(app)
			 .get(`/todo/${result._id}`)
			 .expect(200)
			 .end( (err , res) => {
			 	if (err) return done(err);
				done();
			 });
		});
	});
});

describe('UPDATE /todo/{ID}' , (done) => {

	it ('should be error if id equal empty' , (done) => {
		request(app)
		.patch('/todo/')
		.expect(404)
		.end( (err , res) => {
			if (err) return done(err);
			done();
		})
	});

	it ('should be error if id is invalid' , (done) => {
		let id = "1213455";
		request(app)
		.patch('/todo/' + id)
		.expect(401)
		.end( (err , res) => {
			if (err) return done(err);
			done();
		})
	});

	it ('should be update' , (done) => {
	
		Todos.findOne({}).sort({ _id : -1 }).then( (result) => {
			request(app)
			 .patch('/todo/' +  result._id)
			 .send({ text : "Unit Test update" , completed : true })
			 .expect(200)
			 .end( (err , res) => {
			 	if (err) return done(err);
			 	done();
			 });

		} , (err) => {
			console.log(err)
		});

	});

});

describe('DELETE /todo/{ID}' , () => {
	it ('should be error if id equal empty' , (done) => {
		request(app)
		.delete('/todo/')
		.expect(404)
		.end( (err , res) => {
			if (err) return done(err);
			done();
		})
	});

	it ('should be error if id is invalid' , (done) => {
		let id = "1213455";
		request(app)
		.delete('/todo/' + id)
		.expect(401)
		.end( (err , res) => {
			if (err) return done(err);
			done();
		})
	});

	it ('should be delete' , (done) => {
	
		Todos.findOne({}).sort({ _id : -1 }).then( (result) => {
			request(app)
			 .delete('/todo/' +  result._id)
			 .expect(200)
			 .end( (err , res) => {
			 	if (err) return done(err);
			 	done();
			 });

		} , (err) => {
			console.log(err)
		});

	});

});

describe('POST /user/' , () => {
	it ('should be error if no email' , (done) => {
		let post = {
			password : '12345678' ,
			tokens : {
				access : 'xspdospispidw1213' ,
				token : '12123130dfssdfsfsdf'
			}
		};

		request(app)
		 .post('/user/')
		 .send(post)
		 .expect(400)
		 .end( (err , res) => {
		 	if (err) return done(err);
			done();
		 });
	});

	it ('should be error if email is invalid' , (done) => {
		let post = {
			email : "sippaprut" ,
			password : '12345678' ,
			tokens : {
				access : 'xspdospispidw1213' ,
				token : '12123130dfssdfsfsdf'
			}
		};
		request(app)
		 .post('/user/')
		 .send(post)
		 .expect(400)
		 .end( (err , res) => {
		 	if (err) return done(err);
		 	//expect(res.body.message).toBe('Users validation failed: email: Path `email` is required.')
			done();
		 });
	});

	it ('should be error if email is not uniqe' , (done) => {
		let post = {
			email : "sippaprut@gmail.com" ,
			password : '12345678' ,
			tokens : {
				access : 'xspdospispidw1213' ,
				token : '12123130dfssdfsfsdf'
			}
		};
		request(app)
		 .post('/user/')
		 .send(post)
		 .expect(400)
		 .end( (err , res) => {
		 	if (err) return done(err);
		 	//expect(res.body.message).toBe('Users validation failed: email: Path `email` is required.')
			done();
		 });
	});

	it ('should be error if password is min 8 lenght' , (done) => {
		let post = {
			email : "sippaprut@gmail.com" ,
			password : '1234567' ,
			tokens : {
				access : 'xspdospispidw1213' ,
				token : '12123130dfssdfsfsdf'
			}
		};
		request(app)
		 .post('/user/')
		 .send(post)
		 .expect(400)
		 .end( (err , res) => {
		 	if (err) return done(err);
			done();
		 });
	});

	it ('should be success to add user' , (done) => {
		let post = {
			email : "taeza@gmail.com" ,
			password : '12345678' ,
			tokens : {
				access : 'xspdospispidw1213' ,
				token : '12123130dfssdfsfsdf'
			}
		};
		request(app)
		 .post('/user/')
		 .send(post)
		 .expect(200)
		 .end( (err , res) => {
		 	if (err) return done(err);

		 	User.findByIdAndRemove(res.body._id).then( () => {
		 		done();
		 	}, (err) => {
		 		console.log(err)
		 	});
		 });
	});

	it ('should be can not get user' , (done) => {
		request(app)
			.get('/user/me')
			.expect(400)
			.end( (err , res) => {
				if (err) return done(err);
				done();
			});
	});

	it ('should be can not login' , (done) => {
		let post = {
			email : "sip@funeralnet.com" ,
			password : 1234
		};

		request(app)
			.post('/user/login')
			.send(post)
			.expect(400)
			.end( (err , res) => {
				if (err) return done(err);
				done();
			});
	});

	it ('should be can login' , (done) => {
		let post = {
			email : "taeza111@hotmail.com" ,
			password : "12345678"
		};
		request(app)
			.post('/user/login')
			.send(post)
			.expect(200)
			.end( (err , res) => {
				if (err) return done(err);
				done();
			});
	});


});


after(function() {
   // runs after all tests in this block
   // Todos.remove({}).then( () => {
   	
   // });
});



// afterEach((done) => {
// 	Todos.remove({}).then( () => done());
// });

