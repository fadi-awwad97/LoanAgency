const router = require("express").Router();
const RealUser = require("../models/realUserModel");


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
  // res.send(students)
});




module.exports = router ;