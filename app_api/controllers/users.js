//Requires
var mongoose = require('mongoose');
var User = mongoose.model('User');


//get user profile data
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

//get all users data
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
