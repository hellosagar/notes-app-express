import { NextFunction } from "express";
import { loginSchema, registerSchema } from "../helpers/validationSchema";
import User from "../models/UserModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ACCES_TOKEN, REFRESH_TOKEN } from "../config/config";
import HttpException from "../errors/HttpException";
import createError from "http-errors";

const refreshTokens = [];

export const POST_REGISTER = async (
    req: any,
    res: any,
    next: NextFunction
) => {
    try {
        // Validate the user input
        const result = await registerSchema.validateAsync(req.body)
        const email = req.body.email
        const username = req.body.username
        const password = req.body.password.trim()

        // Checking if user is already exist in the database
        const emailExist = await User.findOne({ email: email })
        if (emailExist) {
            throw new createError.Conflict(`${result.email} is already taken`);
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        // Create new user
        const user = new User({
            email: email,
            username: username,
            password: hash
        })

        // Save user in the database
        const savedUser = await user.save()
        res.json({
            user: savedUser._id,
        })
    } catch (error) {
        next(error)
    }
}

export const POST_LOGIN = async (
    req: any,
    res: any,
    next: NextFunction
) => {
    console.log(req.body);

    try {
        // Validate the user input
        const result = await loginSchema.validateAsync(req.body)
        const email = req.body.email
        const password = req.body.password.trim()

        // Check email exist
        const userExist: any = await User.findOne({ email: email })
        if (!userExist) {
            throw new createError.Conflict(`${result.email} is already taken`);
        }

        // validate password
        const validPass = await bcrypt.compare(password, userExist.password)
        if (!validPass) throw new createError.Unauthorized("Username or Password not valid");

        // Create and assign a token
        const accessToken = jwt.sign({ _id: userExist._id }, ACCES_TOKEN, { expiresIn: "15d" })
        const refrestToken = jwt.sign({ _id: userExist._id }, REFRESH_TOKEN)
        res.header("auth-token", accessToken).json({ accessToken: accessToken, refreshToken: refrestToken })
    } catch (error) {
        // Error Hanlding
        if(error.isJoi == true){
            const badRequest: HttpException = new createError.BadRequest(
                "Invalid Username or Password"
            )
            return next(badRequest)
        }
        next(error)
    }
}

export const POST_LOGOUT = async (req: any,
    res: any,
    next: NextFunction
) => {
    try{
        
    }catch(err){
        
    }
}