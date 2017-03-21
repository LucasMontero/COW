/*
 * There are some modifications to the default Express setup.
 * Each modification is commented and marked with [COW] to make them easy to find.
 */

const EXPRESS        = require('express');
const PATH           = require('path');
const FAVICON        = require('serve-favicon');
const LOGGER         = require('morgan');
const COOKIE_PARSER  = require('cookie-parser');
const BODY_PARSER    = require('body-parser');

// [COW] Require Passport
const PASSPORT = require('passport');
// [COW] Bring in the data model
require('./app_backend/models/db');
// [COW] Bring in the Passport config after model is defined
require('./app_backend/config/passport');
// [COW] Bring in the routes for the API (delete the default routes)
const ROUTES_API = require('./app_backend/routes/index');

const APP = EXPRESS();

//uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
APP.use(LOGGER('dev'));
APP.use(BODY_PARSER.json());
APP.use(BODY_PARSER.urlencoded({ extended: false }));
APP.use(COOKIE_PARSER());
APP.use(EXPRESS.static(PATH.join(__dirname, 'public')));

// [COW] Set the app_frontend folder to serve static resources
APP.use(EXPRESS.static(PATH.join(__dirname, 'app_frontend')));
// [COW] Initialise Passport before using the route middleware
APP.use(PASSPORT.initialize());
// [COW] Use the API routes when path starts with /api
APP.use('/api', ROUTES_API);
// [COW] Otherwise render the index.html page for the Angular SPA
// [COW] This means we don't have to map all of the SPA routes in Express
APP.use(function(req, res) {
  res.sendFile(PATH.join(__dirname, 'app_frontend', 'index.html'));
});

// Catch 404 and forward to error handler
APP.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// [COW] Catch unauthorised errors
APP.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// development error handler
// will print stacktrace
if (APP.get('env') === 'development') {
    APP.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
APP.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// [COW] Set init app configuration
const CTRL_USERS    = require('./app_backend/controllers/users');
const CTRL_PAGES    = require('./app_backend/controllers/pages');
//var ctrlSecret   = require('../controllers/secret');

//Create session secret in Database if not exist. IN DEVELOPMENT
//ctrlSecret.checkSecret();

// [COW] Create user administrator in Database if not exist.
CTRL_USERS.checkAdministrator();

// [COW] Create main page in Database if not exist.
CTRL_PAGES.checkPages();

module.exports = APP;
