import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../constant';
import RentedBookCard from '../components/RentedBookCard';
import axios from 'axios';

function RentedBooks({user}) {
//   const user = "677c59c04ef7d3f6eee4a9a2"; // Assume this is the user ID
  const [rentedBooks, setRentedBooks] = useState([]);

  // Fetch rented books list
  const fetchRentedBooksList = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/books/rented`, { user: user._id });
      if (res.data.success) {
        setRentedBooks(res.data.borrowedBooks);
        console.log(rentedBooks);
      }
    } catch (error) {
      console.error("Error fetching rented books:", error);
    }
  };

  // Handle returning the rented book
  const handleReturnBook = async (bookId) => {
    console.log(bookId)
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/transaction/return`, { userId: user._id, bookId: bookId });
      if (res.data.success) {
        // Update the rented books list by removing the returned book
        setRentedBooks((prevBooks) => prevBooks.filter((borrowedDetail) => {
            return borrowedDetail.book._id !== bookId}
        ));
        
        console.log('Book returned successfully');
      } else {
        console.error('Error returning book');
      }
    } catch (error) {
      console.error('Error handling return book:', error);
    }
  };

  useEffect(() => {
    fetchRentedBooksList();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-6">
        {/* List of rented books */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {rentedBooks.map((rentedBook) => (
            <RentedBookCard
              key={rentedBook.book._id}
              rentedBook={rentedBook}
              userId={user._id}
              onReturn={handleReturnBook} // Pass the return handler to the RentedBookCard
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RentedBooks;
