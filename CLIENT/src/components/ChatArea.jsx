import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../redux/loaderSlice";
import { createNewMessage } from "../apiCalls/message";
const ChatArea = () => {
  const { selectedChat, user } = useSelector((state) => state.userReducer);
  //finding details of selectedUser,with whom user want to chat.
  const selectedUser = selectedChat.members.find((u) => u._id !== user._id);

  const dispatch = useDispatch();
  const [message, setMessage] = useState(" ");

  const sendMessage = async () => {
    try {
      const newMessage = {
        chat: selectedChat._id,
        sender: user._id,
        text: message,
      };
      dispatch(showLoader());
      const response = await createNewMessage(newMessage);
      dispatch(hideLoader());
      // console.log(response);

      if(response.success){
        setMessage("");
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error.message);
    }
  };

  return (
    <>
      {/* {console.log(selectedChat)} */}
      {selectedChat && (
        <div className="app-chat-area">
          <div className="app-chat-area-header">
            {/* RECEIVER DATA */}
            {selectedUser.firstname + " " + selectedUser.lastname}
          </div>
          <div className="main-chat-area">
            {/* CHAT AREA  */}
            CHAT AREA
          </div>
          <div className="send-message-div">
            <input
              type="text"
              className="send-message-input"
              placeholder="Type a message"
              value={message}
              onChange={(e) => {setMessage(e.target.value)}}
            />
            <button
              className="fa fa-paper-plane send-message-btn"
              aria-hidden="true"
              onClick={sendMessage}
            ></button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatArea;
