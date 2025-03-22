import React from "react";
import { useSelector } from "react-redux";

const UsersList = ({ searchKey }) => {
  //importing all users from database
  const { allUsers } = useSelector((state) => state.userReducer);

  //we will filter name with all name entered
  //then display all those in side bar
  return allUsers
    .filter((user) => {
      return (
        (user.firstname.toLowerCase().includes(searchKey.toLowerCase()) ||
          user.lastname.toLowerCase().includes(searchKey.toLowerCase())) &&
        searchKey
      );
    })
    .map((user) => {
      return (
        <div key={user._id} className="user-search-filter">
          <div className="filtered-user">
            <div className="filter-user-display">
              {user.profilePic && (
                <img
                  src={user.profilePic}
                  alt="Profile Pic"
                  className="user-profile-image"
                />
              )}
              {!user.profilePic && (
                <div className="user-default-profile-pic">
                  {user.firstname.charAt(0).toUpperCase() +
                    user.lastname.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="filter-user-details">
                <div className="user-display-name">
                  {user.firstname + " " + user.lastname}
                </div>
                <div className="user-display-email">{user.email}</div>
              </div>
              <div>
                <div className="last-message-timestamp"></div>
              </div>

              <div className="user-start-chat">
                <button className="user-start-chat-btn">Start Chat</button>
              </div>
            </div>
          </div>
        </div>
      );
    });
};

export default UsersList;
