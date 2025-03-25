/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../redux/loaderSlice";
import { createNewMessage, getAllMessages } from "../apiCalls/message";
import { clearUnreadMessageCount } from "../apiCalls/chat";
import moment from "moment";
import store from "../redux/store"

const ChatArea = ({socket}) => {
  const { selectedChat, user, allChats } = useSelector((state) => state.userReducer);
  //finding details of selectedUser,with whom user want to chat.
  const selectedUser = selectedChat.members.find((u) => u._id !== user._id);

  const dispatch = useDispatch();
  const [message, setMessage] = useState(" ");
  const [allMessage, setAllMessage] = useState([]);

  //Sending Messages to backend
  const sendMessage = async () => {
    try {
      const newMessage = {
        chatId: selectedChat._id,
        sender: user._id,
        text: message,
      };
      socket.emit("send-message",{
        ...newMessage,
        members: selectedChat.members.map(m => m._id),
        read: false,
        createdAt: moment().format("DD-MM-YYYY hh:mm:ss")
      })

      const response = await createNewMessage(newMessage);
      // console.log(response);

      if (response.success) {
        setMessage("");
      }
    } catch (error) {
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

  //Adding time stamps in the chat
  const formatTime = (timestamp) => {
    const now = moment();
    const diff = now.diff(moment(timestamp), "days");

    if (diff < 1) {
      return `Today ${moment(timestamp).format("hh:mm A")}`;
    } else if (diff === 1) {
      return `Yesterday ${moment(timestamp).format("hh:mm A")}`;
    } else {
      return moment(timestamp).format("MMM D, hh:mm A");
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
  //Clearing the unread Message Count
  const clearUnreadMessages = async () => {
    try {
      dispatch(showLoader());
      const response = await clearUnreadMessageCount(selectedChat._id);
      // console.log(response);
      dispatch(hideLoader());
      // console.log(response);

      if (response.success) {
        // console.log(allChats);
        allChats.map(chat => {
          if(chat._id === selectedChat._id){
            return response.data;
          }
          return chat;
        })
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getMessage();
    //clearing message count if selected user sees it
    if(selectedChat?.lastMessage?.sender !== user._id){
      clearUnreadMessages();
    }
    //listening to the receive message event
    socket.off("receive-message").on("receive-message", (message) => {
      const selectedChat =store.getState().userReducer.selectedChat;
      if(selectedChat._id === message.chatId){
        setAllMessage(prevmsg => [...prevmsg, message]);
      }
    })
  },[]);

  //getting the scrollbar at the bottom
  useEffect(() => {
    const msgContainer = document.getElementById("main-chat-area");
    msgContainer.scrollTop = msgContainer.scrollHeight;
  },[allMessage]);

  return (
    <>
      {/* {console.log(selectedChat)} */}
      {selectedChat && (
        <div className="app-chat-area" >
          <div className="app-chat-area-header">
            {/* RECEIVER DATA */}
            {formatName(selectedUser)}
          </div>
          <div className="main-chat-area" id="main-chat-area">
            {/* CHAT AREA  */}
            {allMessage.map((msg) => {
              const isCurrentUserSender = msg.sender === user._id;
              return (
                <div
                  key={Math.random()}
                  className="message-container"
                  style={
                    isCurrentUserSender
                      ? { justifyContent: "end" }
                      : { justifyContent: "start" }
                  }
                >
                  <div>
                    <div
                      className={
                        isCurrentUserSender
                          ? "send-message"
                          : "received-message"
                      }
                    >
                      {msg.text}
                    </div>
                    <div
                      className="message-timestamp"
                      style={
                        isCurrentUserSender
                          ? { float: " right" }
                          : { float: "left" }
                      }
                    >
                      {formatTime(msg.createdAt)}
                      {isCurrentUserSender && msg.read && 
                      <i className="fa fa-check-circle" aria-hidden= "true" style={{color: "#e74c3c"}}></i>}
                    </div>
                  </div>
                </div>
              );
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
