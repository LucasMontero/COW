//Requires
var mongoose = require('mongoose');
var toast    = require('../services/toast.js');
var Page     = mongoose.model('Page');

module.exports.checkPages = function(req, res){
  Page.find({}).count().exec(function(err, result){
    if(result === 0){
      console.log('Creating main page.');

      var page =  pagePoputalion(new Page(),{
                                             title: 'Main page',
                                             path: 'mainPage',
                                             content: "<h1>Welcome to COW</h1><p>Go to <a href="/cow-adm">admin panel</a></p>",
                                             header: true,
                                             footer: true,
                                             index: true,
                                             public: true }
                                  );

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
  if (!checkPageConstruction(req, res)) return;

  var page = pagePopulation(new Page(), req.body);

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
  Page.find({}).select('title').exec(function (err, data) {
        if (err) res.status(500).json(toast.unknownErrorToast(err));
        res.status(200).json(data);
  });;
};

/**
 * Get -> Get page data
 *
 * @param  object req Http request
 * @param  object res Http response
 *
 */
module.exports.getPageById = function(req, res) {
    Page.findById(req.query.pageId).exec(function(err, page) {
        if (err) res.status(500).json(toast.unknownErrorToast(err));

        res.status(200).json(page);
    });
};


/**
 * Update a page in DB
 *
 * @param  object req Http request
 * @param  object res Http response
 *
 */
module.exports.updatePageById = function(req, res) {

  Page.findById(req.query.pageId).exec(function (err, page){
        if (err) res.status(500).json(toast.unknownErrorToast(err));

        if (!checkPageConstruction(req, res)) return;

        page = pagePopulation(page, req.body);

        page.save(function(err) {
              if (err) res.status(500).json(toast.unknownErrorToast(err));

              res.status(200).json(toast.elementTaskCorrectly("Page", "updated"));
        });
      });
};

/**
 * Delete -> Remove a page from DB
 *
 * @param  object req Http request
 * @param  object res Http response
 *
 */
module.exports.deletePageById = function(req, res) {
  Page.findById(req.query.pageId).exec(function(err, page) {
        if(page != null){
          page.remove(function(err) {
              if(err) return res.status(500).json(toast.unknownErrorToast(err));
              res.status(200).json(toast.elementTaskCorrectly("Page", "removed"));
          })
        }
    });
};

/**
 * Check if page values are constructed correctly
 *
 * @param  object req Http request
 * @param  object res Http response
 *
 */
function checkPageConstruction(req, res) {
    if (req.body.title === "") {
        res.status(400).json(toast.fieldRequiredToast("Title"));
        return false;
    }

    if (req.body.path === "") {
        res.status(400).json(toast.fieldRequiredToast("Path"));
        return false;
    }

    if (!(/^[A-Za-z0-9/_&]*$/.test(req.body.path))) {
        res.status(400).json(toast.errorInPath());
        return false;
    }

    return true;
}


/**
 * Populate page object with passed values
 *
 * @param  object page     page object to save in db
 * @param  object values   Http request body
 *
 */
function pagePopulation(page, values) {
  page.title    = values.title;
  page.path     = values.path;
  page.content  = values.content;
  page.header   = values.header;
  page.footer   = values.footer;
  page.index    = values.index;
  page.public   = values.public;

  return page;
}
