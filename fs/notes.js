console.log("notes js is requried");

module.exports.age = 10;

module.exports.addNotes = () => {
	console.log("add note");
	return 'new note';
};

module.exports.add = (a , b) => {
	return a + b;
}