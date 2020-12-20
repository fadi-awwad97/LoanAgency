const router = require("express").Router();
const Student = require("../models/studentModel");




router.post("/applyStudent", async (req, res) => {
    const studentData= {firstname, lastname, phone ,email, working, universityname , universityid , universitymajor, expectedyears, neededamount } = req.body;

    console.log(studentData)
    const student = await Student.create(studentData);
    if(!student){
      console.log(err);
    }
          //  if (err) throw err;
    else {
      console.log("student document inserted");
      res.send("true")
    } 
});




router.post("/deleteStudent", async (req, res) => {
  const studentData={oldData} = req.body;
  
  const student = await Student.findByIdAndDelete(studentData.oldData._id);
  if(!student){
    console.log(err);
  }
  else {
    console.log("student document deleted");
    res.send("deleted")
   
  } 
});

  module.exports = router ;