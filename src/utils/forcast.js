const requset = require("request");

/* const url =
  "http://api.weatherapi.com/v1/forecast.json?key=a602cf7813754e3cbf122547241703&q=36.4870666,2.8443455&days=1&aqi=no&alerts=no";

const geoCodeUrl =
  "https://geocode.maps.co/search?q=Blida&api_key=65f79cac7a143316656089jwd7e9199";

requset({url:url , json: true},(error,respone) =>{
   if(error){
    console.log('Unable to connect to weather service')
   }else if(respone.body.error){
    console.log('Unable to find location')
   }else{
    console.log(respone.body.current.condition.text," it is currently ",respone.body.current.temp_c,"but it's feels like ",respone.body.current.feelslike_c,' degress out ')
   }
    console.log(respone.body.current)
})


requset({ url: geoCodeUrl, json: true }, (error, respone) => {
  if (error) {
    console.log("Unable to connect to weather service");
  } else if (!respone.body.length) {
    console.log("Unable to find location");
  } else {
    const lat = respone?.body[0]?.lat;
    const lon = respone?.body[0]?.lon;
    console.log(lat, lon);
  }
});

 */
const forcast = (lon, lat, callback) => {
  const url = `http://api.weatherapi.com/v1/forecast.json?key=a602cf7813754e3cbf122547241703&q=${lon},${lat},&days=1&aqi=no&alerts=no`;

  requset({ url: url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.condition.text +
          " it is currently " +
          body.current.temp_c +
          " but it's feels like " +
          body.current.feelslike_c +
          " degress out "
      );
    }
  });
};
exports.forcast = forcast;
