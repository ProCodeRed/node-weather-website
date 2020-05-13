const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// define paths for express config
app.use(express.static(path.join(__dirname,'../public')));
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine 
app.set('view engine', 'hbs'); // handle bar which allow us to rander docs dynamic way
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// setup static dir to serve
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
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

        forecast(latitude, longitude, (err, forecastData) => {
            if(err) {
                return res.send({
                    error: err
                })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
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

app.listen(3000, () => {
    console.log('server is up on port 3000.')
}); 