import React from 'react'
import HomeHeader from '../components/HomeHeader';
import SideBar from '../components/SideBar';

const Home = () => {
  return (
    <div className="home-page">
      <HomeHeader></HomeHeader>
      <div className="main-content">
        {/* SideBar layout */}
        <SideBar></SideBar>
        
        {/* Chat Area layout */}
      </div>
    </div>
  );
}

export default Home;