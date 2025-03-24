import React, { useEffect } from 'react'
import HomeHeader from '../components/HomeHeader';
import SideBar from '../components/SideBar';
import ChatArea from '../components/ChatArea';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

const Home = () => {
  const { selectedChat } = useSelector( state => state.userReducer );

  const socket = io("http://localhost:5000");

  //Sending a broadCast message to all the chatters
  useEffect(() => {
    //sending Event to the server
    socket.emit("send-message-all", {text: "Hi from detactive!"});
    
    //listening Event from the server
    socket.on("send-message-by-server", data =>{
      console.log(data);
    })

   // Cleanup when component unmounts
    return () => {
      socket.disconnect(); 
    };
  },[])


  return (
    <div className="home-page">
      <HomeHeader></HomeHeader>
      <div className="main-content">
        {/* SideBar layout */}
        <SideBar></SideBar>
        {/* Chat Area layout */}
        {selectedChat && <ChatArea></ChatArea>}
      </div>
    </div>
  );
}

export default Home;