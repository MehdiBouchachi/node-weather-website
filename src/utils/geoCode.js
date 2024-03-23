const requset = require('request')

const geoCode = (address = 'Blida' , callback) => {
    const geoCodeUrl = `https://geocode.maps.co/search?q=${address}&api_key=65f79cac7a143316656089jwd7e9199`;
  
    requset({ url: geoCodeUrl, json: true }, (error, {body}) => {
      if (error) {
        //console.log("Unable to connect to weather service");
        callback("Unable to connect to weather service", undefined);
      } else if (!body.length) {
        console.log("Unable to find location");
        callback("Unable to find location", undefined);
      } else {
        callback(undefined, {
          lat: body[0]?.lat,
          lon: body[0]?.lon,
          location: body[0].display_name,
        });
      }
    });
};

module.exports = geoCode