const MONGOOSE = require('mongoose');
const CONFIG  = require('../../config');

const DB_HOST = CONFIG.dbHost;
const DB_NAME = CONFIG.dbName;
const DB_URI  = DB_HOST + DB_NAME;

var gracefulShutdown;

MONGOOSE.Promise = global.Promise;

MONGOOSE.connect(DB_URI);

// CONNECTION EVENTS
MONGOOSE.connection.on('connected', function() {
  console.log('Mongoose connected to ' + DB_URI);
});
MONGOOSE.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
MONGOOSE.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
  MONGOOSE.connection.close(function() {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', function() {
  gracefulShutdown('app termination', function() {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', function() {
  gracefulShutdown('Heroku app termination', function() {
    process.exit(0);
  });
});

// BRING IN YOUR SCHEMAS & MODELS
require('./mail');
require('./pages');
require('./users');
require('./secret');
