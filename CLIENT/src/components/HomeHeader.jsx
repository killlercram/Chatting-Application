import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomeHeader = () => {
  const { user } = useSelector((state) => state.userReducer);
  //  console.log(user);
  //  console.log(user?.firstname ? user?.firstname.toUpperCase() : "");

  //creating a navigate function
  const navigate = useNavigate();
  //getting Full name from the redux store
  function getFullname() {
    let fname =
      user?.firstname.at(0).toUpperCase() +
      user?.firstname.slice(1).toLowerCase();

    let lname =
      user?.lastname.at(0).toUpperCase() +
      user?.lastname.slice(1).toLowerCase();

    return fname + " " + lname;
  }
  //Geting the initials from the name
  function getInitials() {
    let fnameIn = user?.firstname ? user?.firstname.toUpperCase()[0] : " ";
    let lnameIn = user?.lastname ? user?.lastname.toUpperCase()[0] : " ";
    return fnameIn + lnameIn;
  }
  return (
    <div className="app-header">
      <div className="app-logo">
        <i className="fa fa-comments" aria-hidden="true"></i>
        Quick Chat
      </div>
      <div className="app-user-profile">
        {user?.profilePic && (
          <img
          src={user?.profilePic}
          alt="Profile Pic"
          className="logged-user-profile-pic"
          onClick={() => navigate("/profile")}
          ></img>
        )}
        {!user?.profilePic && (
          <div
          className="logged-user-profile-pic"
          onClick={() => navigate("/profile")}
          >
            {getInitials()}
          </div>
        )}
        <div className="logged-user-name">{getFullname()}</div>
      </div>
    </div>
  );
};

export default HomeHeader;
