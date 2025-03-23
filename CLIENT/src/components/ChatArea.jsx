/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../redux/loaderSlice";
import { createNewMessage, getAllMessages } from "../apiCalls/message";
const ChatArea = () => {
  const { selectedChat, user } = useSelector((state) => state.userReducer);
  //finding details of selectedUser,with whom user want to chat.
  const selectedUser = selectedChat.members.find((u) => u._id !== user._id);

  const dispatch = useDispatch();
  const [message, setMessage] = useState(" ");
  const [allMessage, setAllMessage] = useState([]);

  //Sending Messages
  const sendMessage = async () => {
    try {
      const newMessage = {
        chatId: selectedChat._id,
        sender: user._id,
        text: message,
      };
      dispatch(showLoader());
      const response = await createNewMessage(newMessage);
      dispatch(hideLoader());
      // console.log(response);

      if (response.success) {
        setMessage("");
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error.message);
    }
  };
  //getting All messages
  const getMessage = async () => {
    try {
      dispatch(showLoader());
      const response = await getAllMessages(selectedChat._id);
      dispatch(hideLoader());
      // console.log(response);

      if (response.success) {
        setAllMessage(response.data);
        // console.log(allMessage);
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getMessage();
  }, [selectedChat]);

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
            {allMessage.map(msg => {
              const isCurrentUserSender = msg.sender === user._id;
              return <div key={Math.random()} className="message-container" style={isCurrentUserSender ? {justifyContent: "end"} : {justifyContent: "start"}}>
              <div className={isCurrentUserSender? "send-message" : "received-message"}>{msg.text}</div>
            </div>
            })}
            
          </div>
          <div className="send-message-div">
            <input
              type="text"
              className="send-message-input"
              placeholder="Type a message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
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
