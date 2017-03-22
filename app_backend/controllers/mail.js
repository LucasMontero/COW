const NODE_MAILER = require('nodemailer');
const TOAST       = require('../services/toast.js');
const MONGOOSE    = require('mongoose');
let   MAIL        = MONGOOSE.model('Mail');


//Database functions

/**
 * Set mail parameters in DB
 *
 * @param  object req Http request
 * @param  object res Http response
 *
 */
module.exports.setParameters = function(req, res) {
  console.log('Setting mail parameters.');
  MAIL.find({}).count().exec(function(err, result){
      if(result === 0){
        console.log("new")
        var mail =  mailPopulate(new MAIL(),{
                                                host:     req.body.post,
                                                port:     req.body.port,
                                                secure:   req.body.secure,
                                                username: req.body.username,
                                                password: req.body.password
                                             }
                                );

        mail.save(function(err) {
            if (err){
              console.error(new Error("## ERROR ## --> " + err));
              return res.status(500).json(TOAST.unknownErrorToast());
            }
        });

      }else{
        console.log(result);
      }
     return res.status(200).json(TOAST.elementTaskCorrectly("Mail settings", "updated"));
  });
 /*
  transporter.verify(function(err, success) {
     if (err) {
          console.error(new Error("## ERROR ## --> " + err));
     } else {
          console.log('Server is ready to take our messages');
     }
  });*/
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

//create reusable transporter object
let transporter = NODE_MAILER.createTransport({
   host: 'smtp.gmail.com',
   port: 587,
   secure: false, // upgrade later with STARTTLS
   auth: {
       user: "",
       pass: ""
   }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"Fred Foo 👻" <lucasdeigaz@gmail.com>', // sender address
    to: 'lucasdeigaz@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};


module.exports.sendMail = function(req, res) {

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
          return console.error(new Error("## ERROR ## --> " + err));
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });
}
