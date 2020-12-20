const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName:  {
        type: String,
    },
    email:  {
        type: String
    },
    phone:  {
        type: String
    },
    monthlySal:  {
        type: String
    },
    howLong: {
        type: String
    },
    loanOption: {
        type: String
    },
});


module.exports = Visitor = mongoose.model("user", userSchema);