const request = require('request');

const foreCast = (lat, lon, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric&&APPID=43ad8a118ccc5c4639086792185f388d';

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('unable to connect The Weather service', undefined);
        } else if(body.message){
            callback('Unable to find Given Location', undefined);
        }else {
            const currentTemp = body.main.temp;
            const humidity = body.main.humidity;
            const city = body.name;
            const weather = body.weather[0].description;
            callback(undefined, "This time " + weather + " in the " + city + ". It is currently " + currentTemp + " deg C outside" + "\nThe Humidity is " + humidity )
        }
    })// desturcturing used here
}


module.exports = foreCast;