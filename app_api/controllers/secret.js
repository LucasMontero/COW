//Requires
var mongoose = require('mongoose');
var Secret   = mongoose.model('Secret');


module.exports.checkSecret = function(req, res){
  return Secret.findOne({}, {}, {sort:{'created_at': 1}}, function(err, secret){
    if(!secret){
      secret = new Secret();

      secret.setSecret();

      secret.save();
    }
  });
}
