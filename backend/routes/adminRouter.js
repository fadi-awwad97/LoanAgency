const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");


// router.post("/register", async (req, res) => {
//     try {
//       let { email, password, passwordCheck, displayName } = req.body;
//         //   console.log(req.body)
//       // validate
  
//       if (!email || !password || !passwordCheck)
//         return res.status(400).json({ msg: "Not all fields have been entered." });
//       if (password.length < 5)
//         return res
//           .status(400)
//           .json({ msg: "The password needs to be at least 5 characters long." });
//       if (password !== passwordCheck)
//         return res
//           .status(400)
//           .json({ msg: "Enter the same password twice for verification." });
  
//       const existingUser = await User.findOne({ email: email });
//       if (existingUser)
//         return res
//           .status(400)
//           .json({ msg: "An account with this email already exists." });
//         }
//          catch (err) {
//             res.status(500).json({ error: err.message });
//           }
//         });


router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      // console.log(req.body) 
      //post request yale wasle la hon b2alba hayda lbody
  
      // validate
      if (!email || !password)
        return res.status(400).json({ msg: "Not all fields have been entered." });
  
      //  const user = await User.findOne({ email: email});
      const user = await User.findOne({$and:[ {email: email},{password: password} ]});
      //eza b7ot find la7ala returns array baynama findOne radetle bas l json object la7ala
      //hay lquery for the database
  
      if (!user)
        return res
          .status(400)
          .json({ msg: "No account with this email has been registered." });
    //   console.log(password)
    //   console.log(user.password)
    //   const isMatch = await bcrypt.compare(password, user.password);
      
    //   if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
   
    bcrypt.hash(password, 10, function(err, hash) {
        if (err) { throw (err); }
        //hashing for security
    
        bcrypt.compare(user.password, hash, function(err, result) {
            if (err) {
              // res.status(400).json({ msg: "Invalid credentials." });
                throw (err);
               }
            //  console.log(hash,user.password);
        });
    });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({
        token,
        user: {
          id: user._id,
          displayName: user.displayName,
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  //3arafet hone hayda l id  bas bade ye bade 7ot hayda l password w bnfs lwa2t yale bya3mel posting 
  //la hayda l url beb3tlo l token w l user id w name


  router.delete("/delete", auth, async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.user);
      res.json(deletedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  router.post("/tokenIsValid", async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      if (!token) return res.json(false);
  
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (!verified) return res.json(false);
      // console.log(verified)
      //bas ta3tiya l password yale hpweJWT SECRETE betredelak l id la2n enta 3melt sign fo2 lal id w hatet hayda l password la net2kd
  
      const user = await User.findById(verified.id);
      if (!user) return res.json(false);
  
      return res.json(true);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
      displayName: user.displayName,
      id: user._id,
    });
  });




module.exports = router ;