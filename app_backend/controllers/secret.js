//Requires
const MONGOOSE = require('mongoose');
const SECRET   = MONGOOSE.model('Secret');


module.exports.checkSecret = function(req, res){
  SECRET.find({}).count().exec(function(err, result){
    if(result === 0){
      secret = new SECRET();

      secret.setValue();

      secret.save();
    }
  });
}

module.exports.getSecret = function(req, res){
  SECRET.findOne({}).sort({'created_at': 1}).exec(function(err, secret){

  });
}
