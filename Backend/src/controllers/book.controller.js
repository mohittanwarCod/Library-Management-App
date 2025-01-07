import { Book } from "../models/book.model.js";
import { User } from "../models/user.model.js";


// get 

// list all the books 

const listBooks = async (req,res)=>{

    try{
        const books = await Book.find();
        
        return res.status(200).json({
            books,
            success:true
        })
       

    }catch(err){
       return res.status(500).json({
            message:"Internal Serval Error",
            success:false
        })
      
    }

}



// post
const addBook = async (req,res)=>{
    try{
       const bookDetail = req.body
       
       const addedBook = await Book.create(bookDetail);
       
       if(!addedBook){
         throw new Error({
            message:"Internal Server Error"
         });

         
         
       }

       return res.status(200).json({
        success:true,
        message:"New book Added",
        addedBook
       })

    }catch(err){
        return res.json({
            success:false,
            message:"Error in adding book"
        })
        
    }
}




// put

// /book/:id

const updateBook = async (req,res)=>{
    try{
        const bookId = req.params.id;

        if(!bookId){
            throw new Error({
                message:"Provide BookId"
            })
        }

        let book = await Book.findById(bookId);

        if(!book){
            throw new Error({
                message:"Book not Found"
            })
        }

        const update = {
            ...book._doc,
            author:req.body.author,
            title:req.body.title,
            publicationYear:req.body.publicationYear,
            availability:req.body.availability
        }
        
        book = await Book.findByIdAndUpdate(bookId,update,{
            new:true
        });

        

        if(!book){
            throw new Error({
                message:"Internal Server Error"
            })
        }

        book.save();
        
       
        

        return res.status(200).json({
            message:"Book Updated Successfully",
            success:true,
            book
        })




    }catch(err){
        return res.json({
            message:err.message,
            success:false
        })

    }
}




// delete

const deleteBook = async (req,res)=>{
    try{
        const bookId = req.params.id;

        const book = await Book.findByIdAndDelete(bookId)

        if(!book){
            throw new Error({
                message:"Book not found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Book Deleted Successfully"
        })
    }catch(err){
        return res.json({
            success:false,
            message:err.message
        })
    }
    
}

const getAvailableBooks = async (req,res)=>{
    try{

        let books = await Book.find();
        
        books =await books.filter((book)=>{
            return book.availability===true
        }
        );
     
        return res.status(200).json({
            books,
            success:true
        })
       

    }catch(err){
       return res.status(500).json({
            message:err.message,
            success:false
        })
      
    }


}

const listRentedBookList = async (req,res)=>{
    try{
        const userId = req.body.user
        // console.log(req.body)
        // console.log(userId)
    
        const user = await User.findById(userId)
        .populate({path:"borrowedBooks.book"})
         
        const borrowedBooks = user.borrowedBooks;
       
        return res.status(200).json({
            success:true,
            borrowedBooks
        })
    }catch(err){
        return res.json({
            err
        })
    }
   
    
}

export {deleteBook,updateBook,addBook,listBooks,getAvailableBooks,listRentedBookList}