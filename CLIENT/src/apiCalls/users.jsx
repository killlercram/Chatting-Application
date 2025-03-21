import { axiosInstance } from "./index";
// Getting all the user details from the backend api
export const getLoggedinUser = async () => {
  try {
   const response = await axiosInstance.get("/api/user/get-logged-user");
  //  console.log("users:: ", response.data);
   return response.data;

  } catch (error) {
    return error;
  }

}