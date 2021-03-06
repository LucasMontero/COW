const NODE_MAILER = require('nodemailer');
const TOAST       = require('../services/toast');
const USER        = require('./users');
const MONGOOSE    = require('mongoose');
let   MAIL        = MONGOOSE.model('Mail');


//Database functions
/**
 * Get mail parameters from DB
 *
 * @param  object req  Http request
 * @param  object res  Http response
 *
 * @return object mail Json mail data
 */
module.exports.getParameters = function(req, res) {
  console.log('Getting mail parameters.');
  MAIL.findOne({}).sort({'created_at' : -1 }).select('host port secure username').exec(function(err, mail) {
    if (err){
      console.error(new Error("## ERROR ## --> " + err));
      return res.status(500).json(TOAST.unknownErrorToast());
    }
    return res.status(200).json(mail);
  });
}

/**
 * Set mail parameters in DB
 *
 * @param  object req Http request
 * @param  object res Http response
 *
 */
module.exports.setParameters = function(req, res) {
  console.log('Setting mail parameters.');

  var transporterTest = NODE_MAILER.createTransport({
                                                      host:  req.body.host,
                                                      port:  req.body.port,
                                                      secure: req.body.secure,
                                                      auth: {
                                                              user: req.body.username,
                                                              pass: req.body.password
                                                      }
                                                    });
  transporterTest.verify(function(err, success) {
     if (err) {
          console.error(new Error("## ERROR ## --> " + err));
          return res.status(500).json(TOAST.wrongMailParameters());
     } else {
       MAIL.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, mail) {
           if(mail === null){
             mail = new MAIL();
           }
           mail =  mailPopulate(mail , req.body);

           mail.save(function (err){
             if (err){
               console.error(new Error("## ERROR ## --> " + err));
               return res.status(500).json(TOAST.unknownErrorToast());
             }
           });
           return res.status(200).json(TOAST.elementTaskCorrectly("Mail settings", "updated"));
       });
     }
  });
};




/**
 * Populate mail object with passed values
 *
 * @param  object mail     mail object to save in db
 * @param  object values   Http request body
 *
 */
function mailPopulate(mail, values) {
  mail.host     = values.host,
  mail.port     = values.port,
  mail.secure   = values.secure,
  mail.username = values.username,
  mail.password = values.password

  return mail;
}

//Send mail functions

module.exports.sendMail = function(req, res) {
  MAIL.findOne({}).sort({'created_at' : -1 }).exec(function(err, mail) {
    if (err){
      console.error(new Error("## ERROR ## --> " + err));
      return res.status(500).json(TOAST.unknownErrorToast());
    }

    if (req.body.to === null){
        var userData =USER.getNotificationUsers();
        userData.then(function(users){
          var emails = "";
          for(var i in users){
            emails += users[i].email;
            if(i<users.length-1){
              emails +=  ", ";
            }
          }
          send(req,res, mail, emails);
        });
    }else{
      send(req,res, mail, req.body.to);
    }
  });
}

function send(req, res, mail, to){
  //create transporter object
  var transporter = NODE_MAILER.createTransport({
     host: mail.host,
     port: mail.port,
     secure: mail.secure, // upgrade later with STARTTLS
     auth: {
         user: mail.username,
         pass: mail.password
     }
  });
  // setup email data with unicode symbols
  var mailOptions = {
      from    : '"Cow Administration 🐮" <'+mail.username+'>', // sender address
      to      : to, // list of receivers
      subject : req.body.subject, // Subject line
      text    : req.body.text, // plain text body
      html    : req.body.html // html body
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(err, info) {
      if (err){
        console.error(new Error("## ERROR ## --> " + err));
        return res.status(500).json(TOAST.unknownErrorToast());
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
      return res.status(200).json(TOAST.elementTaskCorrectly("Mail", "sended"));
  });
}
