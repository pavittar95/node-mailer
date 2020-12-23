var express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    
  }
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Server running");
});
router.post("/sendMail", function (req, res, next) {
  transporter.sendMail(
    {
      from: 'sgc.architect@gmail.com',
      to: 'pavitar@supertal.io',
      subject: "Paypal Hooks",
      text: "Paypal Hooks",
      html: JSON.stringify(req.body),
    },
    (error, info) => {
      if (error) {
        console.log(info);
        res.send("Not able to send email at the moment.");
        return console.log(error);
      }
      res.send("Mail send");
    }
  );
});

module.exports = router;
