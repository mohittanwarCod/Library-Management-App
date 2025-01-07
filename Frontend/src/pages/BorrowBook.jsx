import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { BASE_URL } from '../constant'

import BookCard from '../components/BookCard'
import { useNavigate } from 'react-router-dom'
function BorrowBook({user}) {
  const navigate = useNavigate();
  
  const [books,setBooks] = useState([]);
    const fetchBookList = async ()=>{
        const res =await axios.get(`${BASE_URL}/api/v1/books/availbale`);
        
        if(res.data.success){
            // console.log(res.data.books)
            setBooks(res.data.books);
        }else{
            console.log("Error");
        }

    }
    useEffect(()=>{
      if(!(user?._id)){
        navigate("/login")
   }
        fetchBookList();
    },[])
    const removeBookFromList = (bookId) => {
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
    };
  return (
    <>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
        {books.map((book) => (
         <BookCard key={book._id} bookDetail={book} bookBtn={true} onRent={removeBookFromList} user={user} />
        ))}
      </div>
    </div>
    </>
  )
}


export default BorrowBook