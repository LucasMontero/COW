//Requires
var mongoose = require('mongoose');
var toast    = require('../services/toast.js');
var User     = mongoose.model('User');

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

module.exports.checkAdministrator = function(req, res){
  User.find({}).count().exec(function(err, result){
    if(result === 0){
      console.log('Creating administration user.');

      var user = userPopulate(new User(),{
                                              name:     'administrator',
                                              email:    'admin@cow.com',
                                              password: "development",
                                           }
                               );
      user.save();
    }
  });
}

/**
* Create a new user in DB
*
* @param  object req Http request
* @param  object res Http response
*
*/
module.exports.createUser = function(req, res) {
   if(!req.body.name || !req.body.email || !req.body.password) {
     res.status(400).json(toast.allFieldsRequiredToast());
     return;
    }

   var user = userPopulate(new User(), req.body);

   user.save(function(err) {
         if (err) res.status(500).json(toast.unknownErrorToast(err));

         res.status(200).json(toast.elementTaskCorrectly("User", "created"));
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
 User.find({}).select('name email').exec(function (err, data) {
       if (err) res.status(500).json(toast.unknownErrorToast(err));

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
module.exports.getUserById = function(req, res) {
    User.findById(req.query.userId).exec(function(err, user) {
        if (err) res.status(500).json(toast.unknownErrorToast(err));

        res.status(200).json(user);
    });
};

/**
 * Delete -> Remove a user from DB
 *
 * @param  object req Http request
 * @param  object res Http response
 *
 */
module.exports.deleteUserById = function(req, res) {
  User.findById(req.query.userId).exec(function(err, user) {
        if(user != null){
          user.remove(function(err) {
              if(err) return res.status(500).json(toast.unknownErrorToast(err));
              res.status(200).json(toast.elementTaskCorrectly("User", "removed"));
          })
        }
    });
};

/**
 * Update a user in DB
 *
 * @param  object req Http request
 * @param  object res Http response
 *
 */
module.exports.updateUserById = function(req, res) {

  User.findById(req.query.userId).exec(function (err, user){
        if (err) res.status(500).json(toast.unknownErrorToast(err));

        if (req.body.name != "" && user.name != req.body.name) {
          user.name = req.body.name;
        }
        if (req.body.email != "" && user.email != req.body.email  ) {
          user.email = req.body.email;
        }
        if (req.body.password != undefined) {
          user.updatePassword(req.body.password);
        }

        user.save(function(err) {
              if (err) res.status(500).json(toast.unknownErrorToast(err));

              res.status(200).json(toast.elementTaskCorrectly("User", "updated"));
        });
      });
};


/**
 * Populate page object with passed values
 *
 * @param  object page     page object to save in db
 * @param  object values   Http request body
 *
 */
function userPopulate(user, values) {
  user.name  = values.name;
  user.email = values.email;
  user.setPassword(values.password);

  return user;
}
