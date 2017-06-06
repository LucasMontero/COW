//Require
const CONFIG   = require('../../config')
const EXPRESS  = require('express');
const ROUTER   = EXPRESS.Router();

// jwt - connect/express middleware that validates a JsonWebToken (JWT) and set the req.user with the attributes
const JWT      = require('express-jwt'); //npm install express-jwt --save


//Required controllers
const CTRL_AUTH     = require('../controllers/authentication');
const CTRL_USERS    = require('../controllers/users');
const CTRL_PAGES    = require('../controllers/pages');
const CTRL_DESIGN   = require('../controllers/design');
const CTRL_MAIL     = require('../controllers/mail');


var auth = JWT({
  secret: CONFIG.secret,
  userProperty: 'payload'
});

//Routing
//  - authentication

ROUTER.post('/login', CTRL_AUTH.login);

//  - pages

ROUTER.get('/pages',           auth, CTRL_PAGES.getAllPages);
ROUTER.get('/getPageById',     auth, CTRL_PAGES.getPageById);
ROUTER.get('/getIndexpage',    CTRL_PAGES.getIndexPage);
ROUTER.get('/getPageByPath',   CTRL_PAGES.getPageByPath);
ROUTER.post('/createPage',     auth, CTRL_PAGES.createPage);
ROUTER.delete('/deletePage',   auth, CTRL_PAGES.deletePageById);
ROUTER.put('/updatePage',      auth, CTRL_PAGES.updatePageById);

//  - user

ROUTER.get('/users',            auth, CTRL_USERS.getAllUsers);
ROUTER.get('/getUser',          auth, CTRL_USERS.getUserById);
ROUTER.post('/createUser',      auth, CTRL_USERS.createUser);
ROUTER.delete('/deleteUser',    auth, CTRL_USERS.deleteUserById);
ROUTER.put('/updateUser',       auth, CTRL_USERS.updateUserById);
ROUTER.get('/recoverUserPassword',    CTRL_USERS.recoverUserPassword);

//  - design

ROUTER.get('/getDocument',  auth, CTRL_DESIGN.getDocument);
ROUTER.get('/saveDocument', auth, CTRL_DESIGN.saveDocument); // ARREGLAR put

// - settings - Mailing

ROUTER.get('/getMailParameters',  auth, CTRL_MAIL.getParameters);
ROUTER.post('/setMailParameters', auth, CTRL_MAIL.setParameters);
ROUTER.post('/sendMail',          auth, CTRL_MAIL.sendMail);


module.exports = ROUTER;
