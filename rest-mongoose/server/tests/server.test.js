const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todos} = require('./../models/todo');

beforeEach((done) => {
	Todos.remove({}).then( () => done());
});

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

			Todos.find().then( (todos) => {
				expect(todos.length).toBe(1);
				expect(todos[0].text).toBe(post.text);
				done();
			}).catch( (e) => done(e));
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

			Todos.find().then( (data) => {
				expect(data.length).toBe(0);
				done();
			}).catch( (e) => done(e) )


		});
	});


});

