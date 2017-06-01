const CRYPTO   = require('crypto');

var config = {};

//App port
config.port   = 8080; //port

//Localhost
config.dbHost = 'mongodb://localhost/'; //Mongodb Server
config.dbName = 'cowDB' //Database Name

//Secret -- DON'T TOUCH THIS - Encript users session
config.secret = CRYPTO.randomBytes(16).toString('hex');

module.exports = config;
