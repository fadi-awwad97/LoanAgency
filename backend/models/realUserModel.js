const mongoose = require("mongoose");

var realUserSchema = new mongoose.Schema({
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
    startingDate:  {
        type: String
    },
    monthlyPayment:  {
        type: String
    },
    totalPayment:  {
        type: String
    },

});


module.exports = RealUser = mongoose.model("realUser", realUserSchema);