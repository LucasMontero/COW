//Require
var express = require('express');
var router = express.Router();
// jwt - connect/express middleware that validates a JsonWebToken (JWT) and set the req.user with the attributes
var jwt  = require('express-jwt'); //npm install express-jwt --save
var mongoose = require( 'mongoose' );
var User = mongoose.model('User');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

//Required controllers
var ctrlAuth     = require('../controllers/authentication');
var ctrlUsers    = require('../controllers/users');

//Create user administrator in Database

var user = new User();

user.name  = 'administrator';
user.email = 'admin@cow.com';

user.setPassword('development');

user.save();

//Routing
//  - user
router.get('/getUser', auth, ctrlUsers.getUserById);
router.delete('/deleteUser',auth, ctrlUsers.deleteUserById);

//  - users
router.get('/users', auth, ctrlUsers.getAllUsers);


//  - authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
