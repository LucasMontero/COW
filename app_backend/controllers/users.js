//Requires
const MONGOOSE = require('mongoose');
const TOAST    = require('../services/toast.js');
const USER     = MONGOOSE.model('User');


module.exports.checkAdministrator = function(req, res){
  USER.find({}).count().exec(function(err, result){
    if(result === 0){
      console.log('Creating administration user.');

      var user = userPopulate(new USER(),{
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
     return res.status(400).json(TOAST.allFieldsRequiredToast());
    }

   var user = userPopulate(new USER(), req.body);

   user.save(function(err) {
         if (err){
           console.error(new Error("## ERROR ## --> " + err));
           return res.status(500).json(TOAST.unknownErrorToast());
         }

         return res.status(200).json(TOAST.elementTaskCorrectly("User", "created"));
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
 USER.find({}).select('name email').exec(function (err, data) {
       if (err){
          console.error(new Error("## ERROR ## --> " + err));
          return res.status(500).json(TOAST.unknownErrorToast());
       }

       return res.status(200).json(data);
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
    USER.findById(req.query.userId).exec(function(err, user) {
        if (err){
          console.error(new Error("## ERROR ## --> " + err));
          return res.status(500).json(TOAST.unknownErrorToast());
        }

        return res.status(200).json(user);
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
  USER.findOneAndRemove({ _id: req.query.userId }, function(err, user) {
    if (err){
      console.error(new Error("## ERROR ## --> " + err));
      return res.status(500).json(TOAST.unknownErrorToast());
    }
    return res.status(200).json(TOAST.elementTaskCorrectly("User", "removed"));
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
  USER.findById(req.query.userId).exec(function (err, user){
        if (err){
          console.error(new Error("## ERROR ## --> " + err));
          return res.status(500).json(TOAST.unknownErrorToast());
        }

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
              if (err){
                console.error(new Error("## ERROR ## --> " + err));
                return res.status(500).json(TOAST.unknownErrorToast());
              }
              return res.status(200).json(TOAST.elementTaskCorrectly("User", "updated"));
        });
      });
};


/**
 * Populate user object with passed values
 *
 * @param  object user     user object to save in db
 * @param  object values   Http request body
 *
 */
function userPopulate(user, values) {
  user.name  = values.name;
  user.email = values.email;
  user.setPassword(values.password);

  return user;
}
