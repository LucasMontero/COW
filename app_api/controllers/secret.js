//Requires
var mongoose = require('mongoose');
var Secret   = mongoose.model('Secret');


module.exports.checkSecret = function(req, res){
  Secret.find({}).count().exec(function(err, result){
    if(result === 0){
      secret = new Secret();

      secret.setValue();

      secret.save();
    }
  });
}

module.exports.getSecret = function(req, res){
  Secret.findOne({}).sort({'created_at': 1}).exec(function(err, secret){
  
  });
}
