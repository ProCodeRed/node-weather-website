const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000; // port configuration for locally and heroku with OR operator

// define paths for express config
app.use(express.static(path.join(__dirname,'../public')));
app.use(express.json({ limit: '1mb'}));
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine 
app.set('view engine', 'hbs'); // handle bar which allow us to rander docs dynamic way
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// setup static dir to serve
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather forecast',
        name: 'Vipin Yadav'
    });
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name:'Vipin Yadav'
    });
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'How can i hep you here ??',
        name:'Vipin Yadav'
    })
})



app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }

    geoCode(req.query.address, (err, {latitude, longitude, location} = {}) => {
        if(err) {
            return res.send({
                error: err
            })
        }

        forecast(latitude, longitude, (err, {cityName, temperature, description, weatherIcon, feeltemp, pressure, humidity, windSpeed, windDir, sunRise, sunSet, weatherId, countryname, latitude, longitude, timeZone, dataRecieve, seaLevel, groundLevel, cloudiness }) => {
            if(err) {
                return res.send({
                    error: err
                })
            }
            res.send({
                location: location,
                address: req.query.address,
                cityName: cityName,
                temperature: temperature,
                description: description,
                weatherIcon: weatherIcon,
                feeltemp : feeltemp,
                pressure : pressure,
                humidity : humidity,
                windSpeed: windSpeed,
                windDir : windDir,
                sunRise : sunRise,
                sunSet : sunSet,
                weatherId: weatherId,
                countryname: countryname,
                latitude : latitude,
                longitude: longitude,
                timeZone: timeZone,
                dataRecieve: dataRecieve,
                seaLevel: seaLevel,
                groundLevel: groundLevel,
                cloudiness: cloudiness
            })
        })

    })
})




// for specific 404 pages in specfic Routes
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'My 404 Page',
        errorMessage: 'help article not found !'
    })
})



// configure 404 page
app.get('*', (req, res) => {
    res.render('404', {
        title: 'My 404 Page',
        errorMessage: 'Page note Found'
    });
})

app.listen(port, () => {
    console.log('server is up on port ' + port )
});  