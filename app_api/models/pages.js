//required
var mongoose = require('mongoose');

//MongoDB pages schema

var pagesSchema = new mongoose.Schema({
  path: {
    type: String,
    unique: true,
    required: true
  },
  title: {
    type: String,
    unique: true,
    required: true
  },
  body: {
    type: String
  }
  footer:{
    type: Boolean
  }
  header:{
    type: Boolean
  }
  public:{
    type: Boolean
  }
});


mongoose.model('Pages', pagesSchema);
