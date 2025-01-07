import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../constant';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function BookCard({ bookDetail, onRent, userRole, onUpdate,user }) {
  const { title, author, publicationYear, availability, _id: bookId } = bookDetail;

  const [isEditing, setIsEditing] = useState(false);
  const [editBookDetails, setEditBookDetails] = useState({
    title,
    author,
    publicationYear,
    availability,
  });

//   const user = "677c59c04ef7d3f6eee4a9a2"

  // Function to handle deleting the book
  const handleDelete = async () => {
    try {
      
      const res = await axios.delete(`${BASE_URL}/api/v1/books/${bookId}`);
      if (res.data.success) {
        onRent(bookId); // Remove the book from the list
        console.log('Book deleted successfully');
      } else {
        console.error('Error deleting book');
      }
    } catch (error) {
      console.error('Error deleting book', error);
    }
  };

  // Function to handle editing the book
  const handleEdit = async () => {
    try {
        
      const res = await axios.put(`${BASE_URL}/api/v1/books/${bookId}`,editBookDetails);
      if (res.data.success) {
        onUpdate(bookId, res.data.book); // Update the book in the list
        setIsEditing(false); // Close the editing form
        console.log(res.data.book)
        console.log('Book updated successfully');
      } else {
        console.error('Error updating book');
      }
    } catch (error) {
      console.error('Error updating book', error);
    }
  };
  
  const handleOnRent = async ()=>{
    
    
    const res = await axios.post(`${BASE_URL}/api/v1/transaction/borrow`,{
        bookId,
        userId:user._id
        
    })

    if(res.data.success){
        onRent(bookId)
    }
  }
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="p-4">
        {!isEditing ? (
          <>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
            <p className="text-gray-600 mb-2">
              <span className="font-medium text-gray-700">Author:</span> {author}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium text-gray-700">Year:</span> {publicationYear}
            </p>
            <p
              className={`text-sm font-medium ${
                availability ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {availability ? 'Available' : 'Not Available'}
            </p>
          </>
        ) : (
          // Editing Form
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Edit Book</h3>
            <div className="mb-3">
              <label className="block text-gray-700" htmlFor="editTitle">
                Title
              </label>
              <input
                id="editTitle"
                type="text"
                value={editBookDetails.title}
                onChange={(e) =>
                  setEditBookDetails({ ...editBookDetails, title: e.target.value })
                }
                className="mt-1 p-2 w-full border border-gray-300 rounded"
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700" htmlFor="editAuthor">
                Author
              </label>
              <input
                id="editAuthor"
                type="text"
                value={editBookDetails.author}
                onChange={(e) =>
                  setEditBookDetails({ ...editBookDetails, author: e.target.value })
                }
                className="mt-1 p-2 w-full border border-gray-300 rounded"
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700" htmlFor="editYear">
                Publication Year
              </label>
              <input
                id="editYear"
                type="number"
                value={editBookDetails.publicationYear}
                onChange={(e) =>
                  setEditBookDetails({
                    ...editBookDetails,
                    publicationYear: e.target.value,
                  })
                }
                className="mt-1 p-2 w-full border border-gray-300 rounded"
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700" htmlFor="editAvailability">
                Availability
              </label>
              <input
                id="editAvailability"
                type="checkbox"
                checked={editBookDetails.availability}
                onChange={(e) =>
                  setEditBookDetails({
                    ...editBookDetails,
                    availability: e.target.checked,
                  })
                }
                className="mt-2"
              />
            </div>
          </div>
        )}

        {userRole === 'admin' && (
          <div className="mt-4 flex gap-2">
            {/* Delete Button */}
            {availability && !isEditing && (
              <button
                onClick={handleDelete}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                Delete
              </button>
            )}
            {/* Edit Button */}
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors duration-200"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleEdit}
                className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200"
              >
                Save
              </button>
            )}
            {isEditing && (
              <button
                onClick={() => setIsEditing(false)}
                className="w-full bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors duration-200"
              >
                Cancel
              </button>
            )}
          </div>
        )}

        {/* Rent Button for Non-Admins */}
        {availability && userRole !== 'admin' && !isEditing && (
          <button
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
            onClick={handleOnRent}
          >
            Rent
          </button>
        )}
      </div>
    </div>
  );
}

export default BookCard;
