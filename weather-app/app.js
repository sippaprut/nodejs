const yargs = require('yargs');

const geocode = require('./geocode/geocode');

const weatherApi = require('./weather-api/weather.js');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    weatherApi.weathers.get( results.latitude , results.longitude , ( status , data) => {
        if ( status === 'success' )
        {
            console.log("Address: " + results.address );
            console.log("Current Temperature: " + data.temperature );
        }
        else 
        {
            console.log(status)
        }
        
    });
    //console.log(JSON.stringify(results, undefined, 2));
  }
});

//ccf4d3dc520bda42c673261259174836
