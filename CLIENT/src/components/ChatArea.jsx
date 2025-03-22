import React from 'react'
import { useSelector } from 'react-redux';
const ChatArea = () => {
  const {selectedChat} = useSelector(state => state.userReducer);
  return (
    <>
    {/* {console.log(selectedChat)} */}
    {selectedChat && <h2>{selectedChat._id}</h2>}
    </>
  )
}

export default ChatArea;