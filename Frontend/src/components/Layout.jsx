import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout({user,setUser}) {
  // Example: Replace this with your authentication logic
  const isAuthenticated = (user?._id)?true:false; // Change this based on auth state
  const userRole = user.role; // Change this based on logged-in user role
  
  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} userRole={userRole} userName={user.name} setUser={setUser}/>
      <main className="container mx-auto px-4 py-6">
        <Outlet /> {/* This renders the child routes */}
      </main>
    </div>
  );
}

export default Layout;
