import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

function UserProtectedRoute({user,children}) {
    const navigate = useNavigate();
    console.log(user?._id)
    const isAuthenticated = user?._id;
     
     useEffect(()=>{
        if(!isAuthenticated){
            console.log("Not Authenticated");
            navigate("/login")
            return;
        }

     },[])
   

  return (
    <>
      <Outlet/ >
    </>
   
    
  )
     
  
}

export default UserProtectedRoute