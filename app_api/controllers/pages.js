//Requires
var mongoose = require('mongoose');
var toast    = require('../services/toast.js');
var Page     = mongoose.model('Page');

module.exports.checkPages = function(req, res){
  Page.find({}).count().exec(function(err, result){
    if(result === 0){
      console.log('Test page.');

      var page = new Page();

      page.title   = 'Main page';
      page.path    = 'mainPage';
      page.content = "<h1>Welcome to COW</h1>";
      page.header  = true;
      page.footer  = true;
      page.index   = true;
      page.public  = true;

      page.save();
    }
  });
}



/**
 * Create a new page in DB
 *
 * @param  object req Http request
 * @param  object res Http response
 *
 */
module.exports.createPage = function(req, res) {
  if(!req.body.title || !req.body.path) {
    res.status(400).json(toast.allFieldsRequiredToast());
    return;
   }

  var page = new Page();

  page.title  = req.body.title;
  page.path   = req.body.path;
  page.body   = req.body.content;
  page.footer = req.body.footer;
  page.header = req.body.header;
  page.public = req.body.public;

  page.save(function(err) {
        if (err) res.status(500).json(toast.unknownErrorToast(err));
        res.status(200).json(toast.elementTaskCorrectly("Page", "created"));
  });
};

/**
 * Get -> Get all pages data
 *
 * @param  object req Http request
 * @param  object res Http response
 *
 */
module.exports.getAllPages = function(req, res) {
  console.log('dentro');
  Pages.find({}).select('title').exec(function (err, data) {
        if (err) res.status(500).json(toast.unknownErrorToast(err));
        res.status(200).json(data);
        console.log(data);
  });;
};
