
import { Router,Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Books from "./pages/Books"

import BorrowBook from "./pages/BorrowBook"

import RentedBooks from "./pages/RentedBooks"
import Home from "./pages/Home"
import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "./constant"
import Layout from "./components/Layout"
import Dashboard from "./pages/Dashboard"

function App() {

  const [user,setUser] = useState({});
  const authCheck = async ()=>{
    const res = await axios.get(`${BASE_URL}/api/v1/user/profile`,{
      withCredentials:true
    });
    // console.log(res);
    if(res.data.success){
      // console.log(res.data.user);
      setUser(res.data.user);
      // setUser({...user,role:"admin"});
    }
  }

  useEffect(()=>{
    authCheck()
  },[])
 return (
  // <h1 className="h-9 text-slate-700">
  //     Hello world!
  // </h1>
  <>

  
  

  <Routes>
    <Route path="/" element={<Layout user={user} setUser={setUser}/> } >
    <Route path="" element = {<Home user={user} />} />
    
    <Route path="/books" element={<Books user={user} userRole={user.role}/>} />
    <Route path="/books/borrow" element={<BorrowBook user={user} />} />
    <Route path="/books/rented" element={<RentedBooks user={user} />} />
    <Route path="/login" element={<Login setUser={setUser} user={user}/>} />
    <Route path="/signup" element={<Signup setUser={setUser} user={user}/>} />
    <Route path="/admin/dashboard" element={<Dashboard user={user}/>} />
    </Route>
    
  </Routes>
  
  
  
  </>
 )
}

export default App
