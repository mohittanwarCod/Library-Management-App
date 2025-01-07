import { User } from "../models/user.model.js";

import jwt from "jsonwebtoken"
const generateAccessToken = async(userId)=>{
    try{
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        return accessToken;

    }catch(err){
         return err;
    }
}
const createUser = async (req,res)=>{
    try{
        const {name,contactNumber,role,email,password} = req.body
        // console.log(name,contactNumber,role,email,password)

    if(!name || !contactNumber || !(role) || !(email) || !(password)){
        throw new Error({
            message:"Provide the Required Data"
        })
    }

   
    const existedUser = await User.findOne({
         email
    })

  

    if(existedUser){
        throw new Error({
            success:false,
            message:"User already Exists"
        }
        );
    }

    let createdUser =await User.create({
        name,
        contactNumber,
        role,
        email,
        password
    })

    if(!createdUser){
        throw new Error({
            message:"interval Server Error",
            success:false
        })
    }

    const accessToken =await generateAccessToken(createdUser._id);
    createdUser = await User.findById(createdUser._id).select("-password -refreshToken");
    
    const options = {
        httpOnly:true,
        secure:true,
        
        // withCredentials:true
    }

    return res
    .cookie("accessToken",accessToken,options)
    .status(200)
    .json({
        createdUser,
        success:true
    })


    }catch(err){
        // console.log(err.message)
        res.json({
            message:err.message,
            success:false
        })
    }
   
}

const loginUser =async (req,res)=>{
    try{
        // console.log(req.body);
        const {name,email,password} = req.body;
        // password=password.toString()
        if(!password && !email){
            throw new Error({
               success:false,
               status:400,
               message:"Invalide Username or Password"
        });
        }
    
        const user = await User.findOne({
            email
        })
       

       
    
        if(!user){
             throw new Error({
                staus:401,
                message:"Invalid username or email"
        });
        }
    
        const isPasswordCorrect =await user.isPasswordCorrect(password) // methdos are for mongodb not mongoose
        
        if(!isPasswordCorrect) {
            throw new Error({
                staus:401,
                success:false,
                message:"Unauthorised Access"
            });
        }
        
    
        const accessToken =await generateAccessToken(user._id);
        // console.log(accessToken)
        const loggedInUser = await User.findById(user._id).select("-password");
    
        const options = {
            httpOnly:true,
            secure:true,
            // withCredentials:true,
           
        }
        
    
        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .json(
           {
            message:"Login Successfully",
            success:true,
            loggedInUser
           }
        )
    }catch(err){
        
        res.json({
            success:false,
            message:err.message || "Login Unsuccessful"
        })
    }
   
}


const logoutUser = async (req,res)=>{
    // console.log(req.cookies)
    try{
        // const options = {
        //     httpOnly:true,
        //     secure:true
        // }
    
        return res
               .status(200)
               .clearCookie("accessToken")
               .json(
                {
                    message:"Logout Successfully",
                    success:true
                }
               )
    }catch(err){
        res.json({
            success:false,
            message:err.message || "Logout Unsuccessful"
        })
    }
  

}

const authCheck = async (req,res)=>{
    // console.log(req.cookies)
    try {
      const token = req.cookies["accessToken"]
      
    //   console.log(req.cookies);
     
      
     // const user = req.user
  
 
      const decodeToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
      
      const user =await User.findById(decodeToken?._id).select("-password");
      if(!user){
          throw new Error({
            success:false,
            status:401,
            message:"Invalid Access Token"
      });
      }
   
      res
      .status(200)
      .json(
          {
            success:true,
            message:"Authenticated",
            user
          }
         )
         }catch (error) {
          res.json({
            success:false,
            message:"Invalid Access Token"
          })
    }
 
 
 
 }
export {createUser,loginUser,authCheck,logoutUser}