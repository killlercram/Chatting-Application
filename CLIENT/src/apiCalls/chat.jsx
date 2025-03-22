import React from 'react'
import { axiosInstance } from '.'

//Getting all the chats
export const getAllChats = async () => {
  try {
    const response = await axiosInstance.get("api/chat/get-all-chats");
    return response.data;
  } catch (error) {
    return error;
  }
}
//Create a new chat if does not exists.
export const createNewChat = async (members) => {
  try {
    const response = await axiosInstance.post("/api/chat/create-new-chat",{members});
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

