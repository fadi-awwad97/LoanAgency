const router = require("express").Router();
const Visitor = require("../models/userModel");



//get all Users 
router.get("/getUserData", async (req, res) => {
  const clients = await Visitor.find({});
  res.send(clients)
});

//delete seledted user
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
//Posting new application
router.post("/apply", async (req, res) => {
    const userData= {firstName, lastName, email, phone , monthlySal, howLong , loanOption } = req.body;
    const visitor = await Visitor.create(userData);
    if(!visitor){
      console.log(err);
    }
    else {
      console.log("1 document inserted");
    } 

});

  module.exports = router ;