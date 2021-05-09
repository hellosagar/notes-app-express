import express from "express";
import morgan from "morgan";
import { PORT } from "./config/config";
import { errorHandler, pageNotFound } from "./errors/errorHandler";
import { connectDB } from "./helpers/connectDB";
import authRouter from "./routers/authRouter";
import notesRouter from "./routers/notesRouter";

const port = PORT

const app = express()

// Middlewares
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Router Middlewares
app.use("/auth", authRouter)
app.use("/notes", notesRouter)

// Error Handling
app.use(pageNotFound); // page not found : ERROR 404
app.use(errorHandler); // error handler

// Connect to Database
connectDB()

// Server running on port
app.listen(port, () => {
    console.log(`Server started on Port: ${port}`);
})