/*
 * There are some modifications to the default Express setup.
 * Each modification is commented and marked with [COW] to make them easy to find.
 */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// [COW] Require Passport
var passport = require('passport');
// [COW] Bring in the data model
require('./app_api/models/db');
// [COW] Bring in the Passport config after model is defined
require('./app_api/config/passport');
// [COW] Bring in the routes for the API (delete the default routes)
var routesApi = require('./app_api/routes/index');

var app = express();

//uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// [COW] Set the app_client folder to serve static resources
app.use(express.static(path.join(__dirname, 'app_client')));
// [COW] Initialise Passport before using the route middleware
app.use(passport.initialize());
// [COW] Use the API routes when path starts with /api
app.use('/api', routesApi);
// [COW] Otherwise render the index.html page for the Angular SPA
// [COW] This means we don't have to map all of the SPA routes in Express
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// [COW] Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
