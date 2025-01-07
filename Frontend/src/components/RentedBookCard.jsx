import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../constant';

function RentedBookCard({ rentedBook, onReturn ,userId}) {
  const { title, author, publicationYear, _id:bookId } = rentedBook.book;
  const {borrowedDate} = rentedBook;
  
  
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 mb-2">
          <span className="font-medium text-gray-700">Author:</span> {author}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-medium text-gray-700">Year:</span> {publicationYear}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-medium text-gray-700">Borrowed on:</span> {borrowedDate}
        </p>
        
        {/* Conditionally render the Return button for the user */}
        <button
          onClick={()=>onReturn(bookId)}
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
            
          Return
        </button>
      </div>
    </div>
  );
}

export default RentedBookCard;
