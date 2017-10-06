console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
const arg = yargs
			.command('add' , 'Add new Notes' , {
				title : {
					describe : 'Ttitle notes' ,
					demand : true , //required
					alias: 't'
				} ,
				body : {
					describe : "body of note" ,
					alias : 'b'
				}
			})
			.command('list' , 'List all notes')
			.command('remove' , 'Remove note' , {
				title : {
					describe : "Remove notes" ,
					demand : true ,
					alias : 't'
				}
			})
			.help()
			.argv;
console.log(arg);

//const command = process.argv[2];
const command = arg._[0];

if (command === 'add' ) 
{
	if ( notes.addNote( arg.title , arg.body ) )
	{
		console.log('Note is saved');
	}
	else 
	{
		console.log("Can not save data")
	}
}
else if (command === 'list' ) 
{
	console.log(notes.getAll());
}
else if ( command === 'remove') 
{
	notes.remove(arg.title);
	console.log("removed")
}
else if ( command === 'read' )
{
	console.log( notes.read(arg.title) );
}
else if ( command === 'logs')
{
	let note = notes.read(arg.title);
	notes.logs(note);
}

else {
	console.log("invalid command");
}
