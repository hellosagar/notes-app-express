import express, { Router } from "express";
import { DELETE_NOTE, EDIT_NOTE, GET_NOTES, POST_ADD_NOTES } from "../controllers/notesController";
import { verfyToken } from "../helpers/jwtHelper";

const notesRouter = express.Router()

notesRouter.get("/", verfyToken, GET_NOTES)
notesRouter.post("/add", verfyToken, POST_ADD_NOTES)
notesRouter.delete("/delete/:id", verfyToken, DELETE_NOTE)
notesRouter.put("/edit/:id", verfyToken, EDIT_NOTE)

export default notesRouter