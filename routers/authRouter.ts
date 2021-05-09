import express, { Router } from "express";
import { POST_LOGIN, POST_REGISTER } from "../controllers/authController";

const authRouter = express.Router()

authRouter.post("/register", POST_REGISTER)
authRouter.post("/login", POST_LOGIN)

export default authRouter