const fs = require('fs');

const request = require('request');

const APIKEY = 'ccf4d3dc520bda42c673261259174836';

const APIURL = 'https://api.darksky.net/forecast/';

const CACHEPATH = './weather-api/caches/';

const weathersApi = {

	_getCache( cachePath ) {
		try {
			return JSON.parse( fs.readFileSync(cachePath));
		} catch (e) {
			return [];
		}
	} ,

	get ( latitude , longitude , callback) {

		let data = this._getCache( CACHEPATH + latitude + longitude + '.json' );

		if ( data.length == 0 )
		{
			//get service
			request.get(
				{
					url : APIURL + APIKEY + "/" + latitude + "," + longitude ,
					json: true
				} ,
				( error , res , body ) => {

					if ( error ) {
						callback('Unable to connect to Weather servers.');
					} 
					else if ( res.statusCode !== 200 ) {
						callback('Error ' + res.statusCode );
					}
					else {
						fs.writeFileSync(CACHEPATH  + latitude + longitude + '.json' , JSON.stringify(body.currently) );
						callback('success' , body.currently );
					}
				} 
			);
		} 
		else 
		{
			return callback('success' , data );
		}

		
	}	
};

module.exports.weathers = weathersApi;

