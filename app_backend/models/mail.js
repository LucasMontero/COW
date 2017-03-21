//required
const MONGOOSE = require( 'mongoose' );

//MongoDB secret schema

var mailSchema = new MONGOOSE.Schema({
  host:     String,
  port:     Number,
  secure:   Boolean,
  username: String,
  password: String
});

MONGOOSE.model('Mail', mailSchema);
