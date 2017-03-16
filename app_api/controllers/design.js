var fs       = require('fs');
var toast    = require('../services/toast.js');

/**
 *
 * @param  object req Http request
 * @param  object res Http response
 *
 */
module.exports.saveDocument = function(req, res) {
   console.log(req.body.params.documentType);
   console.log(req.body.params.documentContent);
  /*fs.writeFile(req.body.file, req.body.content, function(err) {
    if (err){
      console.log("## ERROR ## --> " + err);
      return res.status(500).json(toast.unknownErrorToast());
    }
    return res.status(200).json(toast.elementTaskCorrectly("Page", "updated"));
  }); */
};

module.exports.saveDocument2 = function(req, res) {
  var doc = getDocumentByType(req.query.documentType);

  fs.writeFile(doc, req.query.documentContent, function(err) {
    if (err){
      console.log("## ERROR ## --> " + err);
      return res.status(500).json(toast.unknownErrorToast());
    }
    return res.status(200).json(toast.elementTaskCorrectly("Data", "saved"));
  }); 
};

/**
 *
 * @param  object req Http request
 * @param  object res Http response
 *
 */
module.exports.getDocument = function(req, res) {
  var doc = getDocumentByType(req.query.documentType);

  fs.readFile(doc, 'utf8', function (err,data) {
    if (err) {
      console.log("## ERROR ## --> " + err);
      return res.status(500).json(toast.unknownErrorToast());
    }
    return res.status(200).json(data);
  });
};


function getDocumentByType(type){
  switch (type) {
    case "Css":
      return __dirname + "/../../public/stylesheets/front.css";
    case "Javascript":
      return __dirname + "/../../public/lib/front.js";
    case "Header":
      return __dirname + "/../../app_client/views/front/directives/header.view.html";
    case "Footer":
      return __dirname + "/../../app_client/views/front/directives/footer.view.html";
  }
}
