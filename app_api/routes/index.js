//Require
var express = require('express');
var router = express.Router();
// jwt - connect/express middleware that validates a JsonWebToken (JWT) and set the req.user with the attributes
var jwt  = require('express-jwt'); //npm install express-jwt --save
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

//Required controllers
var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

//Routing
//  - profile
router.get('/profile', auth, ctrlProfile.profileRead);

//  - authentication
router.post('/register', ctrlAuth.register);
router.post('/', ctrlAuth.login);

module.exports = router;
