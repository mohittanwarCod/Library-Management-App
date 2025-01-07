import mongoose from "mongoose";
import { User } from "./user.model.js";
import { Book } from "./book.model.js";

const transactionSchema = new mongoose.Schema({
    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Book'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    borrowDate:{
       type:String,
    },
    returnedDate:{
        type:String,
    },
    transactionType:{
        type:String,
        required:true
    }
})

export const Transaction = mongoose.model('Transaction',transactionSchema);