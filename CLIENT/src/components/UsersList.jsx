import React from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createNewChat } from "../apiCalls/chat";
import {hideLoader, showLoader} from "../redux/loaderSlice";
import {setAllChats} from "../redux/userSlice";

const UsersList = ({ searchKey }) => {
  //importing all users from database
  const { allUsers, allChats, user: currentUser } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

//Creating new Chat
const startNewChat = async (searchedUserId) => {
  let response = null;
  try {
    dispatch(showLoader());
    // console.log("CU",currentUser); 
    response = await createNewChat([currentUser._id, searchedUserId])
    dispatch(hideLoader());
    console.log("res",response);
    if(response.success){
      toast.success(response.message);
      //getting the new chat
      const newChat = response.data;
      //adding new Chats with previous chats
      const updatedChat = [...allChats, newChat];
      //updating store with newly added chat
      dispatch(setAllChats(updatedChat));
    }
  } catch (error) {
    toast.error(response?.message || error.message);
  }
}

  //we will filter name with all name entered
  //then display all those in side bar
  return allUsers
    .filter((user) => {
      return (
        (
          //If the database contains letter as per search key
          //and after or we are writing if he had chat before
          (user.firstname.toLowerCase().includes(searchKey.toLowerCase()) ||
          user.lastname.toLowerCase().includes(searchKey.toLowerCase())) && searchKey
        ) || (allChats.some(chat => chat.members.includes(user._id)))
        
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

              {!allChats.find((chat) => chat.members.includes(user._id)) && (
                <div className="user-start-chat">
                  <button className="user-start-chat-btn" onClick = {() => startNewChat(user._id)}>Start Chat</button>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    });
};

export default UsersList;
