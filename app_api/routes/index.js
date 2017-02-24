//Require
var express = require('express');
var router = express.Router();
// jwt - connect/express middleware that validates a JsonWebToken (JWT) and set the req.user with the attributes
var jwt  = require('express-jwt'); //npm install express-jwt --save
var mongoose = require( 'mongoose' );

//Required controllers
var ctrlAuth     = require('../controllers/authentication');
var ctrlUsers    = require('../controllers/users');
var ctrlSecret   = require('../controllers/secret');

//Create user administrator in Database if not exist.
ctrlUsers.checkAdministrator();

//Create session secret in Database if not exist. IN DEVELOPMENT
//ctrlSecret.checkSecret();
//console.log(ctrlSecret.getSecret());

var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

//Routing
//  - user
router.get('/getUser',       auth, ctrlUsers.getUserById);
router.delete('/deleteUser', auth, ctrlUsers.deleteUserById);
router.post('/createUser',   auth, ctrlUsers.createUser);
router.put('/updateUser',    auth, ctrlUsers.updateUserById);

//  - users
router.get('/users', auth, ctrlUsers.getAllUsers);

//  - authentication
router.post('/login', ctrlAuth.login);

module.exports = router;
