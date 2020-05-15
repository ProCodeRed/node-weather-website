const request = require('request');

const forecast = (lat, lon, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=metric&APPID=43ad8a118ccc5c4639086792185f388d';

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('unable to connect The Weather service', undefined);
        } else if(body.message){
            callback('Unable to find Given Location', undefined);
        }else {
            const humidity = body.current.humidity
            const weather = body.current.weather[0].description;
            const temp = body.current.temp;
            const windDir = body.current.wind_deg;

            callback(undefined, "There will be " + " " + weather + ' ' + "and temperature is " + " " + temp +" degrees Celsius (°C) with humidity is " + humidity + "%.");

            callback(undefined, [
                humidity, temp, windDir
            ])

            
        }
    })// desturcturing used here
}



module.exports = forecast;