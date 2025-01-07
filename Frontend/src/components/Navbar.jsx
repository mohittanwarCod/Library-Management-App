import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constant";

function Navbar({ isAuthenticated, userRole, userName,setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Clear authentication tokens or user state
    // console.log("User logged out");
    const res = await axios.get(`${BASE_URL}/api/v1/user/logout`,{
        withCredentials:true
    })
    console.log(res);
    if(res.data.success){
        setUser({})
        navigate("/login");
    }
    
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* App Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold hover:text-blue-300 transition"
        >
          Library App
        </Link>

        <div className="flex items-center space-x-4">
          {/* If user is authenticated, show username */}
          {isAuthenticated && (
            <span className="text-gray-300 font-semibold">
              Welcome, {userName || "User"}!
            </span>
          )}

          {/* If user is not authenticated */}
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              {/* Common Links for Authenticated Users */}
              <Link
                to="/books"
                className="hover:text-blue-300 transition-colors font-medium"
              >
                All Books
              </Link>

              {/* Links for User Role */}
              {userRole === "user" && (
                <>
                  <Link
                    to="/books/borrow"
                    className="hover:text-blue-300 transition-colors font-medium"
                  >
                    Browse Books
                  </Link>
                  <Link
                    to="/books/rented"
                    className="hover:text-blue-300 transition-colors font-medium"
                  >
                    My Borrowed Books
                  </Link>
                </>
              )}

              {/* Links for Admin Role */}
              {userRole === "admin" && (
                <Link
                  to="/admin/dashboard"
                  className="hover:text-blue-300 transition-colors font-medium"
                >
                  Admin Panel
                </Link>
              )}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold"
              >
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
