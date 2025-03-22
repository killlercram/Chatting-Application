import React from 'react'
import HomeHeader from '../components/HomeHeader';
import SideBar from '../components/SideBar';
import ChatArea from '../components/ChatArea';

const Home = () => {
  return (
    <div className="home-page">
      <HomeHeader></HomeHeader>
      <div className="main-content">
        {/* SideBar layout */}
        <SideBar></SideBar>
        <ChatArea></ChatArea>
        
        {/* Chat Area layout */}
      </div>
    </div>
  );
}

export default Home;