const fs = require('fs');

//const items = [];

const jsonSources = './sources/notes.json' ;

const fetchData = () => {
	try {
		return JSON.parse( fs.readFileSync(jsonSources));
	} catch (e) {
		return [];
	}
};


const saveData = (items) => {
	//let items = fetchData();
	fs.writeFileSync(jsonSources , JSON.stringify(items) );
	return true;
}


const addNote = ( title , body ) => {
	let items = fetchData();

	let item = {
		title ,
		body
	};

	let duplicateNotes = items.filter( (obj) => {
		return obj.title === title;
	});

	if ( duplicateNotes.length > 0 ){
		return false;
	} 

	items.push(item);
	saveData(items);

	return true;
}

const remove = (title) => {
	let items = fetchData();

	let notes = items.filter( (obj) => {
		return obj.title != title;
	});

	saveData(notes);

}

const getAll = () => {
	return fetchData();
};

const read = (title) => {
	return fetchData().filter( (obj) => {
		return obj.title === title;
	})[0]
}

const logs = (note) => {
	debugger;
	console.log('----');
	console.log('Title: ' , note.title );
}



// module.exports.addNote = (title , body) => {
//   console.log( title + ' ' +  body );
//   return 'New note';
// };

module.exports = {
	addNote ,
	getAll ,
	remove ,
	read ,
	logs
}
