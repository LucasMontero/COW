//required
const MONGOOSE = require( 'mongoose' );
const CRYPTO   = require('crypto');
const JWT      = require('jsonwebtoken'); //npm install jsonwebtoken --save if not installed
//var Secret = mongoose.model('Secret');

//MongoDB user schema

var userSchema = new MONGOOSE.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
});

/**
 * Store in user schema a unique salt and a hash
 * encrypted with user password+salt
 *
 * @param  String  password The password of the user
 *
 */
userSchema.methods.setPassword = function(password){
  this.salt = CRYPTO.randomBytes(16).toString('hex');
  this.hash = CRYPTO.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

/**
 * Update the user schema hash bassed on encrypted password+existing salt
 *
 * @param  String  password The new password of the user
 *
 */
userSchema.methods.updatePassword = function(password){
  this.hash = CRYPTO.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

/**
 * Check if the param password match with the stored user password.
 *
 * @param  String  password The password of the user
 *
 * @return Boolean Passwords match
 */
userSchema.methods.validPassword = function(password) {
  var hash = CRYPTO.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

/**
 * Create a new session object for the logged user
 *
 * @return Object jwt.sign User session object.
 */
userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return JWT.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE! Create mongodbmodel for secret.
};

MONGOOSE.model('User', userSchema);
