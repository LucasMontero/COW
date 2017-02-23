//required
var mongoose = require( 'mongoose' );
var crypto = require('crypto');

//MongoDB secret schema

var userSchema = new mongoose.Schema({
  secret: {
    type: String,
    unique: true,
    required: true
  },
});

userSchema.methods.setSecret = function(){
  this.secret = crypto.randomBytes(16).toString('hex');
};

userSchema.methods.getSecret = function(){
  return this.secret;
}

mongoose.model('Secret', userSchema);
