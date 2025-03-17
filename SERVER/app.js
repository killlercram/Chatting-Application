require("dotenv").config();
const authRouter = require("./controllers/authController");


const express = require("express");
const app = express();

//routers
app.use(express.json());
app.use("/api/auth",authRouter);


module.exports = app;
