import { borrowBookTransaction,getTransactionOnDate,returnBookTransaction } from "../controllers/transaction.controller.js";

import { Router } from "express";

const transactionRouter = Router();

transactionRouter.route('/borrow').post(borrowBookTransaction);
transactionRouter.route('/return').post(returnBookTransaction)
transactionRouter.route('/date').post(getTransactionOnDate)
export {transactionRouter};