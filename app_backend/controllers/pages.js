//Requires
const PASSPORT = require('passport');
const MONGOOSE = require('mongoose');
const TOAST    = require('../services/toast');
let   PAGE     = MONGOOSE.model('Page');

/**
 * Check if any page exist on DB and if not, create ones
 */
module.exports.checkPages = function(){
  PAGE.find({}).count().exec(function(err, result){
    if(result === 0){
      console.log('Creating main page.');

      var page =  pagePopulate(new PAGE(),{
                                             title:   'Main page',
                                             path:    'mainPage',
                                             content: "<h1>Welcome to COW</h1><p>Go to <a href='/cow-adm'>admin panel</a></p>",
                                             header:  true,
                                             footer:  true,
                                             index:   true,
                                             public:  true
                                           }
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

    checkIndex(res, null, req.body.index);

    var page = pagePopulate(new PAGE(), req.body);

    page.save(function(err, page) {
          if (err){
            console.error(new Error("## ERROR ## --> " + err));
            return res.status(500).json(TOAST.unknownErrorToast());
          }
          var pageID = [{"id":page.id}];
          return res.status(200).json(pageID.concat([TOAST.elementTaskCorrectly("Page", "created")]));
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
  PAGE.find({}).select('title index').exec(function (err, data) {
        if (err){
          console.error(new Error("## ERROR ## --> " + err));
          return res.status(500).json(TOAST.unknownErrorToast());
        }
        return res.status(200).json(data);
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
    PAGE.findById(req.query.pageId).exec(function(err, page) {
        if (err){
          console.error(new Error("## ERROR ## --> " + err));
          return res.status(500).json(TOAST.unknownErrorToast());
        }
        return res.status(200).json(page);
    });
};

/**
 * Get -> Get page data
 *
 * @param  object req Http request
 * @param  object res Http response
 *
 */
module.exports.getIndexPage = function(req, res) {
  PASSPORT.authenticate('local');

  PAGE.find().select('title content footer header').where('index', true).exec(function (err, page) {
    return res.status(200).json(page);
  });
};

/**
 * Get -> Get page data
 *
 * @param  object req Http request
 * @param  object res Http response
 *
 */
module.exports.getPageByPath = function(req, res) {
  PASSPORT.authenticate('local');

  PAGE.find().select('title content footer header').where({'path': req.query.pagePath.slice(1), 'public': true, 'index': false}).exec(function (err, page) {
    return res.status(200).json(page);
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
  PAGE.findById(req.query.pageId).exec(function (err, page){
        if (err){
          console.error(new Error("## ERROR ## --> " + err));
          return res.status(500).json(TOAST.unknownErrorToast());
        }

        if(!checkPageConstruction(req, res)) return;

        checkIndex(res, req.query.pageId, req.body.index);

        page = pagePopulate(page, req.body);

        page.save(function(err) {
                if (err){
                  console.error(new Error("## ERROR ## --> " + err));
                  return res.status(500).json(TOAST.unknownErrorToast());
                }
                return res.status(200).json(TOAST.elementTaskCorrectly("Page", "updated"));
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
  PAGE.findById(req.query.pageId).exec(function(err, page) {
          if(page != null){
            if (page.index === true) {
              return res.status(409).json(TOAST.cantDeleteIndex());
            }

            page.remove(function(err) {
              if (err){
                console.error(new Error("## ERROR ## --> " + err));
                return res.status(500).json(TOAST.unknownErrorToast());
              }
                return res.status(200).json(TOAST.elementTaskCorrectly("Page", "removed"));
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
function pagePopulate(page, values) {
  page.title    = values.title;
  page.path     = values.path;
  page.content  = values.content;
  page.header   = values.header;
  page.footer   = values.footer;
  page.index    = values.index;
  page.public   = values.public;

  return page;
}

/**
 * Changue the index value of the old index page to false if new/update page is index.
 *
 * @param  object  PAGE     page bd model
 * @param  object  values   Http request body
 * @param  string  id       Index of the new/updated page
 * @param  boolean index    Indicate is new/updated page is index
 *
 */
function checkIndex(res, id, index){
  if (index === true){
    PAGE.findOneAndUpdate({_id: {$ne: id},'index': true}, {$set:{'index':false}}, function (err, page) {
        if (err){
          console.error(new Error("## ERROR ## --> " + err));
          return res.status(500).json(toast.unknownErrorToast());
        }
    });
  }
}
