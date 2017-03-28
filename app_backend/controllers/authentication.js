//required
const PASSPORT = require('passport');
const MONGOOSE = require('mongoose');
const TOAST    = require('../services/toast');
const USER     = MONGOOSE.model('User');

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
     res.status(400).json(TOAST.allFieldsRequiredToast());
     return;
   }

  PASSPORT.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(400).json(TOAST.unknownErrorToast(err));
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
      res.status(401).json(TOAST.invalidLoginToast());
    }

  })(req, res);

};
