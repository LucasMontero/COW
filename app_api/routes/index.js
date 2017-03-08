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
var ctrlPages    = require('../controllers/pages');

//Create user administrator in Database if not exist.
ctrlUsers.checkAdministrator();

ctrlPages.checkPages();

//Create session secret in Database if not exist. IN DEVELOPMENT
//ctrlSecret.checkSecret();
//var secret = ctrlSecret.getSecret();

var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

//Routing
//  - authentication

router.post('/login', ctrlAuth.login);

//  - pages

router.get('/pages',           auth, ctrlPages.getAllPages);
router.get('/getPageById',     auth, ctrlPages.getPageById);
router.get('/getIndexpage',    ctrlPages.getIndexPage);
router.get('/getPageByPath',   ctrlPages.getPageByPath);
router.post('/createPage',     auth, ctrlPages.createPage);
router.delete('/deletePage',   auth, ctrlPages.deletePageById);
router.put('/updatePage',      auth, ctrlPages.updatePageById);

//  - user

router.get('/users',         auth, ctrlUsers.getAllUsers);
router.get('/getUser',       auth, ctrlUsers.getUserById);
router.post('/createUser',   auth, ctrlUsers.createUser);
router.delete('/deleteUser', auth, ctrlUsers.deleteUserById);
router.put('/updateUser',    auth, ctrlUsers.updateUserById);




module.exports = router;
