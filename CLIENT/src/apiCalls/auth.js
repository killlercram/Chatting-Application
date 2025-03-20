import { axiosInstance } from "./index";

//signup User function
const signupUser = async (user) =>{
  try {
    const response = await axiosInstance.post("/api/auth/signup", user);
    return response.data;
    
  } catch (error) {
    const errorMessage = error.response?.data?.message;
    return {success: false, message: errorMessage};
  }
};
export default signupUser;
