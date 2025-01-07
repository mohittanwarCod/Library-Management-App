import { Router } from "express";

import { deleteBook,updateBook,addBook,listBooks, getAvailableBooks, listRentedBookList } from "../controllers/book.controller.js";

const bookRouter = Router();

bookRouter.route('/').get(listBooks);
bookRouter.route('/').post(addBook);
bookRouter.route('/:id').put(updateBook);
bookRouter.route('/:id').delete(deleteBook);
bookRouter.route('/availbale').get(getAvailableBooks)
bookRouter.route('/rented').post(listRentedBookList)
export {bookRouter};