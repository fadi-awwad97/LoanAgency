const router = require("express").Router();
const Student = require("../models/studentModel");

//return all students 
router.get("/getStudentData", async (req, res) => {
    const students = await Student.find({});
    res.send(students)
});

module.exports = router ;