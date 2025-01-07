import { Book } from "../models/book.model.js";
import { Transaction } from "../models/transaction.model.js";
import { User } from "../models/user.model.js";


// borrowBook Transaction

const borrowBookTransaction = async (req,res)=>{
    try{
        const {bookId,userId} = req.body

    if(!bookId){
        throw new Error({
            message:"Provide BookId"
        })
    }

    if(!userId){
        throw new Error({
            message:"Provide UserId"
        })
    }

    const book = await Book.findById(bookId);
    if(!book){
        throw new Error({
            message:"Book Not Found"
        })
    }

    const user = await User.findById(userId)
    if(!user){
        throw new Error({
            message:"User not Found"
        })
    }

   


const date = new Date(); 
const day = date.getDate(); 
const month = date.getMonth() + 1; 
const year = date.getFullYear(); 
const borrowedDate = `${day}/${month}/${year}`;
const currBookDetail = {
    book,
    borrowedDate
}
const transaction =await Transaction.create({
    user:userId,
    book:bookId,
    borrowDate:borrowedDate,
    transactionType:"borrow"   
})

if(!transaction){
    throw new Error({
        message:"Internal Server Error",
    })

}
user.borrowedBooks.push(currBookDetail);

book.availability = false;
await book.save();
await user.save();
// console.log(user)
return res.status(201).json({
    message:"Book Borrowed Successfully",
    success:true,
    transaction
})
    }catch(err){
        res.json({
            success:false,
            message:err.message
        })
    }
   
}

const returnBookTransaction = async (req,res)=>{
    try{
        const {bookId,userId} = req.body
        
    if(!bookId){
        throw new Error({
            message:"Provide BookId"
        })
    }

    if(!userId){
        throw new Error({
            message:"Provide UserId"
        })
    }

    let book = await Book.findById(bookId);
   
    if(!book){
        throw new Error({
            message:"Book Not Found"
        })
    }

    let user = await User.findById(userId).populate({path:"borrowedBooks.book"})
    // console.log(user);
    if(!user){
        throw new Error({
            message:"User not Found"
        })
    }

   


const date = new Date(); 
const day = date.getDate(); 
const month = date.getMonth() + 1; 
const year = date.getFullYear(); 
const returnDate = `${day}/${month}/${year}`;
// const currBookDetail = {
//     bookId,
//     borrowedDate
// }
const transaction =await Transaction.create({
    user:userId,
    book:bookId,
    returnedDate:returnDate,
    transactionType:"return"   
})


if(!transaction){
    throw new Error({
        message:"Internal Server Error",
    })

}
user.borrowedBooks = user.borrowedBooks.filter((borrowedBook)=>{

return borrowedBook.book._id.toString() !== book._id.toString()
})
book.availability = true;
await book.save();
await user.save();

return res.status(201).json({
    message:"Book Return Successfully",
    success:true,
    transaction
})
    }catch(err){
       return res.json({
            success:false,
            message:err.message
        })
    }

    

}
// return book


const getTransactionOnDate = async (req, res) => {
    try {
       
      const { date } = req.body; 
  
      if (!date) {
        return res.status(400).json({ success: false, message: "Date is required" });
      }
  
     
      const transactions = await Transaction.find({
        $or: [
          { borrowDate: date },
          { returnedDate: date },
        ],
      }).populate([{path:"user",select:"-password"},{path:"book"}])
  
     
  
      return res.status(200).json({ success: true, transactions });
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  };
  
export {borrowBookTransaction,returnBookTransaction,getTransactionOnDate}