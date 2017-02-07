/**Passport is a Node module that simplifies the process of handling authentication in Express.
 *It provides a common gateway to work with many different authentication “strategies”, such as logging
 *in with Facebook, Twitter or Oauth.
 *The strategy we’ll use is called “local”, as it uses a username and password stored locally.
*/

//required
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'email' //Asign email schema fields as username
  },
  /**
   * Check if user exits in db
   *
   * @param  String req  Http request
   * @param  String res  Http response
   * @param         done Passport method
   *
   * @return Object User object or Error
   */
  function(username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // Return if password is wrong
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // If credentials are correct, return the user object
      return done(null, user);
    });
  }
));
