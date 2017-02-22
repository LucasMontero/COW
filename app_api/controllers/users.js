//Requires
var mongoose = require('mongoose');
var User = mongoose.model('User');


/* Query example
 *  var query = User.find({})
 *  query.select('name email');
 *  query.where('name', administrator);
 *  query.limit(5);
 *  query.skip(100);
 *  query.exec(function (err, data) {
 *     res.status(200).json(data);
 *  });
 */

 /**
  * Create a new user in DB
  *
  * @param  object req Http request
  * @param  object res Http response
  *
  */
 module.exports.createUser = function(req, res) {
   if(!req.body.name || !req.body.email || !req.body.password) {
     res.status(400).json({
       "toast" : {
           "result": "error",
           "message":"All fields required."
       }
     });
     return;
    }

   var user = new User();

   user.name = req.body.name;
   user.email = req.body.email;

   user.setPassword(req.body.password);

   user.save(function(err) {
     res.status(200).json({
       "toast" : {
           "result": "ok",
           "message":"User created correctly."
       }
     });
   }); 
 };

/**
 * Get -> Get user data
 *
 * @param  object req Http request
 * @param  object res Http response
 *
 */
module.exports.getUserById = function(req, res) {
    User.findById(req.query.userId).exec(function(err, user) {
      res.status(200).json(user);
    });
};

/**
 * Get -> Get all users data
 *
 * @param  object req Http request
 * @param  object res Http response
 *
 */
module.exports.getAllUsers = function(req, res) {
  User.find({}, 'name email').exec(function (err, data) {
    res.status(200).json(data);
  });;
};

/**
 * Delete -> Remove a user from DB
 *
 * @param  object req Http request
 * @param  object res Http response
 *
 */
module.exports.deleteUserById = function(req, res) {

  User.findById(req.query.userId, function(err, user) {
        if(user != null){
          user.remove(function(err) {
              if(err) return res.status(500).send(err.message);
              res.status(200).send();
          })
        }
    });
};
