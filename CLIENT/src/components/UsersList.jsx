import React from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createNewChat } from "../apiCalls/chat";
import { hideLoader, showLoader } from "../redux/loaderSlice";
import { setAllChats, setSelectedChat } from "../redux/userSlice";
import moment from "moment";

const UsersList = ({ searchKey }) => {
  //importing all users from database
  const {
    allUsers,
    allChats,
    user: currentUser,
    selectedChat,
  } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  //Creating new Chat
  const startNewChat = async (searchedUserId) => {
    let response = null;
    try {
      dispatch(showLoader());
      // console.log("CU",currentUser);
      response = await createNewChat([currentUser._id, searchedUserId]);
      dispatch(hideLoader());
      // console.log("res",response);

      if (response.success) {
        toast.success(response.message);
        //getting the new chat
        const newChat = response.data;
        //adding new Chats with previous chats
        const updatedChat = [...allChats, newChat];
        //updating store with newly added chat
        dispatch(setAllChats(updatedChat));
        dispatch(setSelectedChat(newChat));
      }
    } catch (error) {
      toast.error(response?.message || error.message);
    }
  };

  //Opening chat for the selected user:
  const openChat = (selectedUser) => {
    //getting selected userid and logged user id from members arr
    const chat = allChats.find(
      (chat) =>
        chat.members.map((m) => m._id).includes(currentUser._id) &&
        chat.members.map((m) => m._id).includes(selectedUser._id)
    );
    if (chat) {
      dispatch(setSelectedChat(chat));
      // console.log("Chat Selected:", chat);
    } else {
      console.log("No chat found with this user!");
    }
  };

  //taking only the selected chat for highlighting
  const IsSelectedChat = (user) => {
    if (selectedChat) {
      return selectedChat.members.map((m) => m._id).includes(user._id);
    }
    return false;
  };

  //Getting Last Message in the sidebar with the users
  const getLastMessage = (userId) => {
    const chat = allChats.find((chat) =>
      chat.members.map((m) => m._id).includes(userId)
    );
    if (!chat || !chat.lastMessage) {
      return "";
    } else {
      const msgPrefix =
        chat?.lastMessage?.sender === currentUser._id ? "You:" : "";
      return msgPrefix + chat.lastMessage?.text?.substring(0, 25);
    }
  };

  //Getting the lastmessage time
  const getLastMessageTimeStamp = (userId) => {
    const chat = allChats.find((chat) =>
      chat.members.map((m) => m._id).includes(userId)
    );
    if (!chat || !chat?.lastMessage) {
      return "";
    } else {
      return moment(chat?.lastMessage?.createdAt).format('hh:mm A');
    }
  };

  //Creating  format for displaying username
  function formatName(user) {
    let fname =
      user.firstname.at(0).toUpperCase() +
      user.firstname.slice(1).toLowerCase();
    let lname =
      user.lastname.at(0).toUpperCase() + user.lastname.slice(1).toLowerCase();
    return fname + " " + lname;
  }

  //Getting the count for unread message
  const getUnreadMessageCount = (userId) => {
    const chat = allChats.find(chat => 
      chat.members.map(m => m._id).includes(userId)
    );

    if(chat && chat.unreadMessageCount && chat.lastMessage?.sender !== currentUser._id){
      return <div className="unread-message-counter"> {chat.unreadMessageCount} </div>;
    }else{
      return "";
    }
  };
  //we will filter name with all name entered
  //then display all those in side bar
  return allUsers
    .filter((user) => {
      return (
        //If the database contains letter as per search key
        //and after or we are writing if he had chat before
        ((user.firstname.toLowerCase().includes(searchKey.toLowerCase()) ||
          user.lastname.toLowerCase().includes(searchKey.toLowerCase())) &&
          searchKey) ||
        allChats.some((chat) =>
          chat.members.map((m) => m._id).includes(user._id)
        )
      );
    })
    .map((user) => {
      return (
        <div
          key={user._id}
          className="user-search-filter"
          onClick={() => openChat(user)}
        >
          <div
            className={IsSelectedChat(user) ? "selected-user" : "filtered-user"}
          >
            <div className="filter-user-display">
              {user.profilePic && (
                <img
                  src={user.profilePic}
                  alt="Profile Pic"
                  className="user-profile-image"
                />
              )}
              {!user.profilePic && (
                <div
                  className={
                    IsSelectedChat(user)
                      ? "user-selected-avatar"
                      : "user-default-avatar"
                  }
                >
                  {user.firstname.charAt(0).toUpperCase() +
                    user.lastname.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="filter-user-details">
                <div className="user-display-name">{formatName(user)}</div>
                
                <div className="user-display-email">
                  {getLastMessage(user._id) || user.email}
                </div>
              </div>
              <div>
               {getUnreadMessageCount(user._id)}
              <div className="last-message-timestamp">
                {getLastMessageTimeStamp(user._id)}
              </div>
              </div>
              {!allChats.find((chat) =>
                chat.members.map((m) => m._id).includes(user._id)
              ) && (
                <div className="user-start-chat">
                  <button
                    className="user-start-chat-btn"
                    onClick={() => startNewChat(user._id)}
                  >
                    Start Chat
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    });
};

export default UsersList;
