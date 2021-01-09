const connection = require("./models/connection");

const express = require("express");
const application = express();
require("dotenv").config();

const bodyparser = require("body-parser");

application.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,x-auth-token');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });



application.use(express.json());
application.use(bodyparser.urlencoded ({
    extended:true
}));

application.listen("5000", ()=> {
    console.log("Server started");
});

application.use("/user", require("./routes/adminRouter"));

application.use("/user", require("./routes/userRouter"));

application.use("/user", require("./routes/studentRouter"));

application.use("/user", require("./routes/getStudentRouter"));

application.use("/user", require("./routes/sendemail"));

application.use("/user", require("./routes/realUserRouter"));