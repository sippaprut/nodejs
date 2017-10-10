const geocoder = require('../geocode/geocode');

const geoAddress = ( address ) => {
	return new Promise( (resolve , reject ) => {
		geocoder.geocodeAddress( address  , (message , results ) => {
			if ( typeof message === "undefined") {
				resolve( results );
			}
			else {
				reject( message )
			}
		});
	});
};

geoAddress('phonyothin 49/1')
.then( (locations) => {
	console.log(locations)
})
.catch( (error) => {
	console.log(error)
});