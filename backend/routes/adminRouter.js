const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");



router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // validate
      if (!email || !password)
        return res.status(400).json({ msg: "Not all fields have been entered." });
  
      const user = await User.findOne({$and:[ {email: email},{password: password} ]});
  
      if (!user)
        return res
          .status(400)
          .json({ msg: "No account with this email has been registered." });
    //hashing for security
    bcrypt.hash(password, 10, function(err, hash) {
        if (err) { throw (err); }
        
        bcrypt.compare(user.password, hash, function(err, result) {
            if (err) {
                throw (err);
               }
        });
    });
    // check out which user is the owner of the token
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

  //deleting User
  router.delete("/delete", auth, async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.user);
      res.json(deletedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  //check if token is valid
  router.post("/tokenIsValid", async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      if (!token) return res.json(false);
  
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (!verified) return res.json(false);
  
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