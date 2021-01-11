const router = require("express").Router();
const RealUser = require("../models/realUserModel");
var TeleSignSDK = require('telesignsdk');

router.post("/insertUser", async (req, res) => {
    const realUser0= {firstname, lastname, phone ,email,startingDate,monthlyPayment,totalPayment } = req.body;

    console.log(realUser0)
    const realUser = await RealUser.create(realUser0);
    if(!realUser){
      console.log(err);
    }
    else {
      console.log("Real User inserted");
      res.send("true")
    } 


})
var datetime = new Date().toISOString().slice(0,10);
router.get("/getRealUserData", async (req, res) => {
  const real = await RealUser.find({startingDate: datetime});
  // console.log(real);
  res.send(real);

  
  // console.log(datetime.toISOString().slice(0,10));


  // console.log(real[0].startingDate )
  // var date = new Date(real[0].startingDate );
  // date.setDate(date.getDate() + 30)
  // console.log(date)

});

router.put("/updateRealUserData", async (req, res) => {
  let remaining=req.body.totalPayment-req.body.monthlyPayment;

   let date = new Date(req.body.startingDate);
    date.setDate(date.getDate() + 30)
    date1=date.toISOString().slice(0,10);
  const upReal = await RealUser.updateOne({_id:req.body._id},{startingDate: date1, totalPayment:remaining});
   console.log(upReal)






   const customerId = "4F62D5D1-3DB0-4251-9D6B-5FF6F1CD7292";
   const apiKey = "H6dxpt9bWvFp7VBqyOMwcV0qShvSvbAtIOEmwUYT3DiMa5YJHje6mJs4X5WfPUf+TrPth3/QPL1nDdbvIybJLw==";
   const rest_endpoint = "https://rest-api.telesign.com";
  //  const timeout = 10*1000; // 10 secs
 
   const client = new TeleSignSDK( customerId,
       apiKey,
       rest_endpoint
      //  timeout // optional
       // userAgent
   );
 
  //  const phoneNumber = "96176818836";
  const phoneNumber = req.body.phone;
   const message ="hello "+req.body.firstname+ " your payment has been settled and Your remaining payment is "+remaining+" Your next Payment at "+date1 ;
   const messageType = "ARN";
 
   console.log("## MessagingClient.message ##");
 
   function messageCallback(error, responseBody) {
       if (error === null) {
           console.log(`Messaging response for messaging phone number: ${phoneNumber}` +
               ` => code: ${responseBody['status']['code']}` +
               `, description: ${responseBody['status']['description']}`);
       } else {
           console.error("Unable to send message. " + error);
       }
   }
   client.sms.message(messageCallback, phoneNumber, message, messageType);








  // res.send(students)
});




module.exports = router ;