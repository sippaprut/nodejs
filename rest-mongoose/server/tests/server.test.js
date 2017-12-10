const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todos} = require('./../models/todo');



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
		let text = "Test Todo";

		request(app)
		.post('/todos')
		.send({ text })
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
		let id = '5a239142aa529104a5f3d102';
		request(app)
		 .get(`/todo/${id}`)
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
