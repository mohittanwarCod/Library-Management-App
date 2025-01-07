import { Router } from "express";
import { createUser, loginUser,authCheck, logoutUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/signup").post(createUser);
userRouter.route('/login').post(loginUser)
userRouter.route("/profile").get(authCheck);
userRouter.route('/logout').get(logoutUser)
export {userRouter}