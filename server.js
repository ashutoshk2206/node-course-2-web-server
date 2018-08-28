const express = require('express');
const hbs = require('hbs'); //handlebars template engine
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('access.log', log + '\n', (error) => {
        if (error) {
            console.log('Error occured while writing to log file.');
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        pageTitle: 'Maintenance'
    });
    //next();
});

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: 'Ashutosh',
    //     toDo: [
    //         'Pollution check',
    //         'Repair Bike'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to Home Page!'
    })
});

app.get('/about', (req, res) => {
    //res.send('About page');
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to service the request'
    });
});

app.listen(3000, () => {
    console.log('Server is up and running on port 3000');
});