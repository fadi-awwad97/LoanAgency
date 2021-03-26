var nodemailer = require('nodemailer');
const router = require("express").Router();



//Send Email Using nodemailer
router.post("/sendEmail", async (req, res) => {
   const email0= {email} = req.body; 

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'flyfinancial60@gmail.com',
    pass: 'Fadiawwad123'
  }
});

var mailOptions = {
  from: 'flyfinancial60@gmail.com',
  to: email0.email,
  subject: 'Fly_FINANCIAL',
  text: 'DEAR Client , your request was reviewed, we will contact u soon , THANK YOU FOR YOUR TRUST'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    res.send('Email is sent')
  }
});

});
module.exports = router ;