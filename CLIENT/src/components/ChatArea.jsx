import React from "react";
import { useSelector } from "react-redux";
const ChatArea = () => {
  const { selectedChat , user} = useSelector((state) => state.userReducer);

  //finding details of selectedUser,with whom user want to chat.
   const selectedUser = selectedChat.members.find(u => u._id !== user._id);
  return (
    <>
      {/* {console.log(selectedChat)} */}
      {selectedChat && (
        <div className="app-chat-area">
          <div className="app-chat-area-header">
            {/* RECEIVER DATA */}
            {selectedUser.firstname+ " " + selectedUser.lastname}
          </div>
          <div>
            {/* CHAT AREA  */}
            CHAT AREA
          </div>
          <div>
            {/* SEND MESSAGE */}
            SEND MESSAGE
          </div>
        </div>
      )}
    </>
  );
};

export default ChatArea;
