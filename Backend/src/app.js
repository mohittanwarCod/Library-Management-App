
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
const app = express();
import cookieParser from "cookie-parser"

dotenv.config({
    path:'./.env'
})
app.use(cors({
    // origin:"https://library-management-app-red.vercel.app",
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));

app.use(express.json({
    limit:"16kb",
}))

app.use(cookieParser());

import {bookRouter} from "./routes/book.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { transactionRouter } from "./routes/transactions.routes.js";
app.use("/api/v1/books",bookRouter);
app.use("/api/v1/user",userRouter);
app.use("/api/v1/transaction",transactionRouter);

// app.listen(process.env.PORT,()=>{
//     console.log(`listening on port : ${process.env.PORT}`)
// })

export {app};