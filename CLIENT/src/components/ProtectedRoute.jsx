/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getLoggedinUser } from '../apiCalls/users';

const ProtectedRoute = ({children}) => {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  //getting and setting user with logged in details
  const getLoggedInUser  = async () =>{
    let response = null;
try {
   response = await getLoggedinUser();

  if (response.success) {
    setUser(response.data);
  }else{
    navigate("/login");
  }
} catch (error) {
  navigate("/login");
}
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/login");
    }else {
      //getting user's details
      getLoggedInUser();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  return (
    <>
    <p>Name: {user?.firstname +" "+ user?.lastname}</p>
    {children}
    </>
  )
}

export default ProtectedRoute;


