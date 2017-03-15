var fs       = require('fs');
var toast    = require('../services/toast.js');

/**
 *
 * @param  object req Http request
 * @param  object res Http response
 *
 */
module.exports.writeFile = function(req, res) {
  fs.writeFile(req.body.file, req.body.content, function(err) {
    if (err){
      console.log("## ERROR ## --> " + err);
      return res.status(500).json(toast.unknownErrorToast());
    }
    return res.status(200).json(toast.elementTaskCorrectly("Page", "updated"));
  });
};

/**
 *
 * @param  object req Http request
 * @param  object res Http response
 *
 */
module.exports.getFile = function(req, res) {
  fs.readFile(req.body.file, 'utf8', function (err,data) {
    if (err) {
      console.log("## ERROR ## --> " + err);
      return res.status(500).json(toast.unknownErrorToast());
    }
    return res.status(200).json(data);
  });
};
