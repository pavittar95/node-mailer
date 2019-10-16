var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const CONST = require('../constants');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Server running');
});
router.post('/sendMail', function(req, res, next) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: CONST.auth,
    tls: {
      rejectUnauthorized: false
    }
  });
  transporter.sendMail(
    {
      from: `<${req.body.mail}>`,
      to: CONST.mail,
      subject: `You have new query from ${req.body.name}`,
      text: 'You have new query',
      html: `<p>${req.body.msg}</p>`
    },
    (error, info) => {
      if (error) {
        return console.log(error);
      }
    }
  );
  transporter.sendMail(
    {
      from: '"SGC Architect"',
      to: req.body.mail,
      subject: 'SGC Architect',
      text: 'SGC Architect',
      html: `<div>Hi ${req.body.name}
      <p>We have received your message. we will contact in sort period of time.</p>
      <p>Thank you</p>
      <p>Sgc Architect</p>
      </div>`
    },
    (error, info) => {
      if (error) {
        res.send('Not able to send email at the moment.');
        return console.log(error);
      }
      res.send('Mail send');
    }
  );
});

module.exports = router;
