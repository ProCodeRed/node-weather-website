const request = require('request');

const forecast = (lat, lon, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric&APPID=43ad8a118ccc5c4639086792185f388d';

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('unable to connect The Weather service', undefined);
        } else if(body.message){
            callback('Unable to find Given Location', undefined);
        }else {
            callback(undefined, {
                cityName: body.name,
                temperature: body.main.temp,
                description : body.weather[0].description,
                weatherIcon: body.weather[0].icon,
                feeltemp: body.main.feels_like,
                pressure: body.main.pressure,
                humidity: body.main.humidity,
                windSpeed: body.wind.speed,
                windDir: body.wind.deg,
                sunRise: body.sys.sunrise,
                sunSet: body.sys.sunset,
                weatherId: body.weather[0].id,
                countryname: body.sys.country,
                latitude: body.coord.lat,
                longitude: body.coord.lon,
                timeZone: body.timezone,
                dataRecieve: body.dt,
                seaLevel : body.main.sea_level,
                groundLevel : body.main.grnd_level
            })

            
        }
    })// desturcturing used here
}


module.exports = forecast;