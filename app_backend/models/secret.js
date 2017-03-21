//required
const MONGOOSE = require( 'mongoose' );
const CRYPTO   = require('crypto');

//MongoDB secret schema

var secretSchema = new MONGOOSE.Schema({
  value: {
    type: String,
    unique: true,
    required: true
  },
});

secretSchema.methods.setValue = function(){
  this.value = CRYPTO.randomBytes(16).toString('hex');
};

secretSchema.methods.getValue = function(){
  return this.value;
}

MONGOOSE.model('Secret', secretSchema);
