const router = require("express").Router();
const RealUser = require("../models/realUserModel");
var TeleSignSDK = require('telesignsdk');

//Insert a User
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

//Get the current dateTime to Check which Users have Due Payments today
var datetime = new Date().toISOString().slice(0,10);
router.get("/getRealUserData", async (req, res) => {
  const real = await RealUser.find({startingDate: datetime});
  res.send(real);
});

//After Paying the Due Amount , Payemnt due date must be updated to the next month with the remaining amount 
router.put("/updateRealUserData", async (req, res) => {
  let remaining=req.body.totalPayment-req.body.monthlyPayment;
   let date = new Date(req.body.startingDate);
    date.setDate(date.getDate() + 30)
    date1=date.toISOString().slice(0,10);
  const upReal = await RealUser.updateOne({_id:req.body._id},{startingDate: date1, totalPayment:remaining});
   console.log(upReal)

//As well A confirmation message that Payment is setteled must be Sent using Telesign   
   const customerId = "4F62D5D1-3DB0-4251-9D6B-5FF6F1CD7292";
   const apiKey = "H6dxpt9bWvFp7VBqyOMwcV0qShvSvbAtIOEmwUYT3DiMa5YJHje6mJs4X5WfPUf+TrPth3/QPL1nDdbvIybJLw==";
   const rest_endpoint = "https://rest-api.telesign.com";
 
   const client = new TeleSignSDK( customerId,
       apiKey,
       rest_endpoint
   );
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
});


module.exports = router ;