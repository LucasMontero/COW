const NODE_MAILER = require('nodemailer');
const TOAST       = require('../services/toast.js');

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


module.exports.saveSettings = function(req, res) {
  // verify connection configuration
  transporter.verify(function(err, success) {
     if (err) {
          console.error(new Error("## ERROR ## --> " + err));
     } else {
          console.log('Server is ready to take our messages');
     }
  });
}


module.exports.sendMail = function(req, res) {

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
          return console.error(new Error("## ERROR ## --> " + err));
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });
}
