//Requires
var mongoose = require('mongoose');
var User = mongoose.model('User');


/**
 * Get user profile data
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
 * Get all users data
 *
 * @param  object req Http request
 * @param  object res Http response
 *
 */
module.exports.getAllUsers = function(req, res) {
  User.find({}, 'name email').exec(function (err, data) {
    res.status(200).json(data);
  });;

  //With queries
  //var query = User.find({})
  //query.select('name occupation');
  //query.where('field', 5);
  //query.limit(5);
  //query.skip(100);
  //query.exec(function (err, data) {
  //  res.status(200).json(data);
  //});

};

/**
 * Remove a user from DB
 *
 * @param  object req Http request
 * @param  object res Http response
 *
 */
module.exports.deleteUser = function(req, res) {
  console.log("dentro");
  /*User.findOne({email: "asd"}, function (err, model) {
    if (err) {
        return;
    }
    model.remove(function (err) {
        res.status(200).json("User remove - ok");
    });
  });*/
};
