import React from "react";
import { Link } from "react-router-dom";

function Home({ user }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 min-h-screen px-8 py-12">
      {/* Left Section - About Library App */}
      <div className="max-w-md text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          Welcome to the Library App!
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Discover a wide variety of books, borrow them conveniently, and manage your reading journey with ease. Our app is designed for both avid readers and library admins.
        </p>
        <p className="text-lg text-gray-600">
          Whether you're a passionate bookworm or managing library resources, we've got everything you need.
        </p>
      </div>

      {/* Right Section - Browse Books Button */}
      
    </div>
  );
}

export default Home;
