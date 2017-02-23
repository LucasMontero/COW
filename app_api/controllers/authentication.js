//required
var passport = require('passport');
var mongoose = require('mongoose');
var toast    = require('./toast.js');
var User     = mongoose.model('User');

//ADD SECURITY - VALIDATION//

/**
 * Login a user in page
 *
 * @param  object req Http request
 * @param  object res Http response
 *
 */
module.exports.login = function(req, res) {

   if(!req.body.email || !req.body.password) {
     res.status(400).json(toast.allFieldsRequiredToast());
     return;
   }

  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(400).json(toast.unknownErrorToast(err));
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(toast.invalidLoginToast());
    }

  })(req, res);

};
