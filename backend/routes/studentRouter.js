const router = require("express").Router();
const Student = require("../models/studentModel");
const request = require('request');





router.post("/applyStudent", async (req, res) => {
    const studentData= {firstname, lastname, phone ,email, working, universityname , universityid , universitymajor, expectedyears, neededamount } = req.body;

    console.log(studentData)
    const student = await Student.create(studentData);
    if(!student){
      console.log(err);
    }
    else {
      console.log("student document inserted");
      res.send("true")
    } 
    // request({
    //   url: 'https://fcm.googleapis.com/fcm/send',
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": "application/json",
    //     // 'Authorization': 'Bearer ' + 'AAAA10WWUxI:APA91bHlPzmRRieNQC2o-rt85i7zNa4Er35GIWbWTXnoPqxnooYY4TH7F34_3B2P2gN528BhNKYkGXeKtft44zfYvMT51x6N1KP-EYCUDLSrgNzwd8engzX8YLq3i9wqTW9Tqq_qnF8I'

    //     "Authorization": ['key', 'AAAA10WWUxI:APA91bHlPzmRRieNQC2o-rt85i7zNa4Er35GIWbWTXnoPqxnooYY4TH7F34_3B2P2gN528BhNKYkGXeKtft44zfYvMT51x6N1KP-EYCUDLSrgNzwd8engzX8YLq3i9wqTW9Tqq_qnF8I'].join('=')
    //   },
    // //   authorization: {"Bearer Token" : "AAAA10WWUxI:APA91bHlPzmRRieNQC2o-rt85i7zNa4Er35GIWbWTXnoPqxnooYY4TH7F34_3B2P2gN528BhNKYkGXeKtft44zfYvMT51x6N1KP-EYCUDLSrgNzwd8engzX8YLq3i9wqTW9Tqq_qnF8I" 
    // // },
    //   json: {
    //     "notification": {
    //         "title": "Firebase annnaaa",
    //         "body": "Firebase jeyee men NODEEE JS",
    //         "click_action": "http://localhost:3000/",
    //         "icon": "http://url-to-an-icon/icon.png"
    //     },
    //     "to":"  cHsEyq8wt5K2ERuvrgi75O:APA91bFlXQowRYOwoCPKlQhI5WUDmvs2cEsn4e4KoVxbYJiNhygWPqMobP-qGdPxL0NxOmkxavJ5ArUnVMKbXKkEEdgqCVSYCXT78TAnr4u63SZD9mhTMeqfAcN7ahJU5SbrMxzxZ1Vh"}
    // }, function(err, res, body) {
    //   console.log(body.results[0].message_id)
    //   request(body.results[0].message_id)
    // });
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