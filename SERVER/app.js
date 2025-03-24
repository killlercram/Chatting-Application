require("dotenv").config();
const authRouter = require("./controllers/authController");
const userRouter = require("./controllers/userController");
const chatRouter = require("./controllers/chatController");
const messageRouter = require("./controllers/messageController");


const express = require("express");
const app = express();
app.use(express.json());

//creating socket with app object
const server = require("http").createServer(app);
const io = require("socket.io")(server, {cors: {
  origin: process.env.FRONT_END_KEY,
  methods: ["GET", "POST"]
}})



//routers
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/chat",chatRouter);
app.use("/api/message",messageRouter);

//handling the data coming from the client and sending back to the clients.
io.on("connection", socket => {
  socket.on("send-message-all",data => {
    socket.emit("send-message-by-server", "Message from server: " +data.text);
  });
});

module.exports = server;
// module.exports = app;
