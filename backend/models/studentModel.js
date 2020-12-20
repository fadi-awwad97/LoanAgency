const mongoose = require("mongoose");

var studentSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname:  {
        type: String,
    },
    phone:  {
        type: String
    },
    email:  {
        type: String
    },
    working:  {
        type: Boolean
    },
    universityname: {
        type: String
    },
    universityid: {
        type: String
    },
    universitymajor: {
        type: String
    },
    expectedyears: {
        type: String
    },
    neededamount : {
        type : String
    }
});


module.exports = Student = mongoose.model("student", studentSchema);