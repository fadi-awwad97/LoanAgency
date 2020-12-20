const router = require("express").Router();
const Student = require("../models/studentModel");


router.get("/getStudentData", async (req, res) => {
    const students = await Student.find({});
    // console.log(students);
    res.send(students)
});







module.exports = router ;