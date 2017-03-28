const FS       = require('fs');
const TOAST    = require('../services/toast');

/**
 *
 * @param  object req Http request
 * @param  object res Http response
 *
 */
module.exports.getDocument = function(req, res) {
  var doc = getDocumentByType(req.query.documentType);

  FS.readFile(doc, 'utf8', function (err,data) {
    if (err) {
      console.error(new Error("## ERROR ## --> " + err));
      return res.status(500).json(TOAST.unknownErrorToast());
    }
    return res.status(200).json(data);
  });
};

/**
 *
 * @param  object req Http request
 * @param  object res Http response
 *
 */
module.exports.saveDocument = function(req, res) {
  var doc = getDocumentByType(req.query.documentType);
  
  FS.writeFile(doc, req.query.documentContent, function(err) {
    if (err){
      console.error(new Error("## ERROR ## --> " + err));
      return res.status(500).json(TOAST.unknownErrorToast());
    }
    return res.status(200).json(TOAST.elementTaskCorrectly("Data", "updated"));
  });
};

function getDocumentByType(type){
  switch (type) {
    case "Css":
      return __dirname + "/../../public/stylesheets/front.css";
    case "Javascript":
      return __dirname + "/../../public/lib/front.js";
    case "Header":
      return __dirname + "/../../app_frontend/views/front/directives/header.view.html";
    case "Footer":
      return __dirname + "/../../app_frontend/views/front/directives/footer.view.html";
  }
}
