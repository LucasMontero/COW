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
 * Get -> Get user profile data
 *
 * @param  object req Http request
 * @param  object res Http response
 *
 */
module.exports.profileRead = function(req, res) {

  //If no user ID exits in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    //Otherwise continue
    User.findById(req.payload._id).exec(function(err, user) {
      res.status(200).json(user);
    });
  }

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
 * Get -> Get user data
 *
 * @param  object req Http request
 * @param  object res Http response
 *
 */
module.exports.getUser = function(req, res) {
  User.findById(req.query.userId).exec(function (err, data) {
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
module.exports.deleteUser = function(req, res) {

  User.findById(req.query.userId, function(err, user) {
        user.remove(function(err) {
            if(err) return res.status(500).send(err.message);
            res.status(200).send();
        })
    });
};
