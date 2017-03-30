//required
var mongoose = require( 'mongoose' );
var crypto = require('crypto');

//MongoDB secret schema

var secretSchema = new mongoose.Schema({
  value: {
    type: String,
    unique: true,
    required: true
  },
});

secretSchema.methods.setValue = function(){
  this.value = crypto.randomBytes(16).toString('hex');
};

secretSchema.methods.getValue = function(){
  return this.value;
}

mongoose.model('Secret', secretSchema);
