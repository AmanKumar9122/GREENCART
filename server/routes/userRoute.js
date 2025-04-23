// import express from "express";
import {Router} from "express";
import { isAuth, login, logout, register } from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";

const userRouter = Router();

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/is-auth",authUser, isAuth)
userRouter.get("/logout",authUser, logout)

export default userRouter;