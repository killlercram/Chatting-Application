const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

//Sign up request means creating Account
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    //1. If the user already exists
    const user = await User.findOne({ email: email });

    //2. If user exists, sending an error response
    if (user) {
      return res.send({
        message: "User already exists!!",
        success: false,
      });
    }
    //3.encrypting the password
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;

    //4.Create new user, Saving it in DB
    //we can also use create
    const newUser = new User(req.body);
    await newUser.save();

    res.send({
      message: "User created successfully!",
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});

module.exports = router;
