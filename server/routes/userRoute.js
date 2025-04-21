// import express from "express";
import {Router} from "express";
import { register } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/register", register)

export default userRouter;