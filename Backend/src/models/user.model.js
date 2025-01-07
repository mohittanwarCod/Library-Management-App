import mongoose, { mongo } from "mongoose";
import { Book } from "./book.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
// const borrowedBookSchema = new mongoose.Schema({
//     book:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'Book',
//     },
//     borrowedDate:{
//         type:String
//     }
    
    
// })
const userSchmea = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
      type:String,
      unique:true,
      required:true,
      lowercase:true
    },
    contactNumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    borrowedBooks:[
        {book:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Book',
        },
        borrowedDate:{
                    type:String
        }
     }
    ]
        
        
},{timestamps:true})

userSchmea.pre("save",async function(next){
    if(!(this.isModified("password"))) return next();
    
    this.password =await bcrypt.hash(this.password,10);
    
    
    next();
    
})

userSchmea.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchmea.methods.generateAccessToken =function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        name:this.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
)
}

export const User = mongoose.model('User',userSchmea);