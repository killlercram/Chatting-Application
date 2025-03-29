import React, { useEffect, useState } from "react";
import HomeHeader from "../components/HomeHeader";
import SideBar from "../components/SideBar";
import ChatArea from "../components/ChatArea";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

//Attaching Socket to the code
const socket = io(import.meta.env.VITE_BACKEND_URL, {
  transports: ["websocket"],  // Force WebSocket transport
  withCredentials: true       // Allow credentials (cookies, auth headers)
});
const Home = () => {
  const { selectedChat, user } = useSelector((state) => state.userReducer);
  const [onlineUser, setOnlineUser] = useState([]);

  //Create socket room
  useEffect(() => {
    if (user) {
      socket.emit("join-room", user._id);

      // Handling the user logged in for showing them online
      socket.emit("user-login", user._id);
      //adding online users in online users array
      socket.on("online-users", (onlineusers) => {
        setOnlineUser(onlineusers);
      });
      //removing online user from online users array
      socket.on("online-users-updated", (onlineusers) => {
        setOnlineUser(onlineusers);
      });
    }
  }, [user, onlineUser]);

  return (
    <div className="home-page">
      <HomeHeader socket={socket}></HomeHeader>
      <div className="main-content">
        {/* SideBar layout */}
        <SideBar socket={socket} onlineUser={onlineUser}></SideBar>
        {/* Chat Area layout */}
        {selectedChat && <ChatArea socket={socket}></ChatArea>}
      </div>
    </div>
  );
};

export default Home;
