const yargs = require('yargs');

const axios = require('axios');

// const geocode = require('./geocode/geocode');

// const weatherApi = require('./weather-api/weather.js');

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


const encodedAddress = encodeURIComponent(argv.address);
const GEOURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;


axios.get(GEOURL)
  .then( ( { data } ) => {
      if ( data.status === 'ZERO_RESULTS') {
          throw new Error('Unable to find that address');
      }

      let weatherURL = 'https://api.darksky.net/forecast/ccf4d3dc520bda42c673261259174836/';

      console.log(data.results[0].formatted_address);

      return axios.get( weatherURL + data.results[0].geometry.location.lat + "," + data.results[0].geometry.location.lng );

  })

  .then ( ( res ) => {
      if ( res.status !== 200  ) {
          throw new Error('ERROR:' + res.status  +' Unable to get to Weather servers.');
      }
      console.log( res.data.currently.temperature );
  })

  .catch( (err) => {
      if ( err.code === 'ENOTFOUND' ) {
          console.log('Unable to connect to API servers.');
      }
      else {
        console.log(err.message);
      }
  })


