const router = require("express").Router();
const User = require("../models/user");
const authMiddleware = require("../middlewares/authMiddleware");
require("dotenv").config();

//GET details of current logged-in user
router.get("/get-logged-user", authMiddleware, async (req, res) => {
  try {
    //matching by user id which we have passed in the authMiddleWare
    const user = await User.findOne({ _id: req.body.userId });

    res.status(200).send({
      message: "User fetched successfully!",
      status: true,
      data: user
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

//Getting details of all user except loggedin user
router.get("/get-all-users", authMiddleware, async (req, res) => {
  try {
    //finding all users excluding currently logged in user
    const userId= req.body.userId;
    const allUsers = await User.find({_id: {$ne: userId}});

    res.status(200).send({
      message: "All users fetched successfully!",
      status: true,
      data: allUsers
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});


module.exports = router;
