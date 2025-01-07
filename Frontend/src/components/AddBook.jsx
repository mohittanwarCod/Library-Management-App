import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../constant';
import { useState } from 'react';
function AddBook({onCreate}) {
    const [formData,setFormData] = useState({});
    const initialState = {
        title:'',
        author:'',
        publicationYear:'',
        availability:true
    };

    const handleChange = (e)=>{
        const name  = e.target.name;
        const value = e.target.value;
        setFormData(formData=> ({...formData,[name]:value}));
    }
    const resetForm = ()=>{
        setFormData(initialState)
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const res = await axios.post(`${BASE_URL}/api/v1/books`,{
            ...formData
        })
        if(res.data.success){
            onCreate(res.data.addedBook);
        }
        console.log(res.data);
        resetForm();
    }

  return (
     <>  
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Create New Book</h3>
            <form
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  required
                  onChange={handleChange}
                  className="mt-2 p-2 w-full border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="author">
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  required
                  onChange={handleChange}
                  className="mt-2 p-2 w-full border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="publicationYear">
                  Publication Year
                </label>
                <input
                  type="number"
                  id="publicationYear"
                  name="publicationYear"
                  value={formData.publicationYear}
                  required
                  onChange={handleChange}
                  className="mt-2 p-2 w-full border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="availability">
                  Availability
                </label>
                <input
                  type="checkbox"
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  defaultChecked
                  className="mt-2 p-2"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Create Book
              </button>
            </form>
          </div>
     </>
  )
}

export default AddBook