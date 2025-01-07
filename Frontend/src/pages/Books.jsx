import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../constant.jsx';
import axios from 'axios';
import BookCard from '../components/BookCard';
import AddBook from '../components/AddBook.jsx';
import { useNavigate } from 'react-router-dom';

function Books({user,userRole}) {
  const [books, setBooks] = useState([]);
//   console.log(user);
  const [isCreateBookFormOpen, setIsCreateBookFormOpen] = useState(false);
//   const userRole = "admin";
 const navigate = useNavigate();
  useEffect(() => {

    if(!(user?._id)){
      return  navigate("/login")
   }
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/books`);
        if (response.data.success) {
          setBooks(response.data.books);
        } else {
          console.error('Error fetching books');
        }
      } catch (error) {
        console.error('Error fetching books', error);
      }
    };

    fetchBooks();
  }, []);


  const removeBookFromList = (bookId) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
  };

  const addBookToList = (book)=>{
    setBooks([...books,book]);
  }

 
  const toggleCreateBookForm = () => {
    setIsCreateBookFormOpen((prev) => !prev);
  };

  const updateBookInList = (bookId, updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book._id === bookId ? updatedBook : book))
    );
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-6">
        {/* Conditionally render the Admin buttons */}
        {userRole === "admin" && (
          <div className="mb-4 flex gap-4">
            {/* Button to open form for creating a new book */}
            <button
              onClick={toggleCreateBookForm}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              Create New Book
            </button>
          </div>
        )}

        {/* Conditionally render Create Book Form if it's open */}
        {isCreateBookFormOpen && <AddBook onCreate={addBookToList}/>
        }

        {/* Books List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard
              key={book._id}
              bookDetail={book}
              onRent={removeBookFromList} 
              userRole={user.role} 
              onUpdate={updateBookInList}
              user={user}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Books