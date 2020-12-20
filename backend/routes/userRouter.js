const router = require("express").Router();
const Visitor = require("../models/userModel");




router.get("/getUserData", async (req, res) => {
  const clients = await Visitor.find({});
  // console.log(students);
  res.send(clients)
});

router.post("/deleteUser", async (req, res) => {
  const userData={oldData} = req.body;
  
  const user = await Visitor.findByIdAndDelete(userData.oldData._id);
  if(!user){
    console.log(err);
  }
  else {
    console.log("user document deleted");
    res.send("deleted")
   
  } 
});

router.post("/apply", async (req, res) => {
    const userData= {firstName, lastName, email, phone , monthlySal, howLong , loanOption } = req.body;

    // console.log(x)
    const visitor = await Visitor.create(userData);
    if(!visitor){
      console.log(err);
    }
          //  if (err) throw err;
    else {
      console.log("1 document inserted");
    } 

});

  module.exports = router ;