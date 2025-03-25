import React, { useEffect } from 'react'
import HomeHeader from '../components/HomeHeader';
import SideBar from '../components/SideBar';
import ChatArea from '../components/ChatArea';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

const socket = io("http://localhost:5000");
const Home = () => {
  const { selectedChat , user} = useSelector( state => state.userReducer );


  //Sending a broadCast message to all the chatters
  // useEffect(() => {
  //   //sending Event to the server
  //   socket.emit("send-message-all", {text: "Hi from detactive!"});
    
  //   //listening Event from the server
  //   socket.on("send-message-by-server", data =>{
  //     console.log(data);
  //   })

  //  // Cleanup when component unmounts
  //   return () => {
  //     socket.disconnect(); 
  //   };
  // },[])

  //Create socket room
  useEffect(()=>{
    if(user){
      socket.emit("join-room", user._id);
      // socket.emit("send-message",{text: "Hello! Shashwat", recipient: "67dbba251354cde3123dd93d"});
      // //handling event from server
      // socket.on("received-message", data => {
      //   console.log(data);
      // })

    }

  },[user]);

  return (
    <div className="home-page">
      <HomeHeader></HomeHeader>
      <div className="main-content">
        {/* SideBar layout */}
        <SideBar socket={socket}></SideBar>
        {/* Chat Area layout */}
        {selectedChat && <ChatArea socket={socket}></ChatArea>}
      </div>
    </div>
  );
}

export default Home;