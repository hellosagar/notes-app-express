import { NextFunction } from "express";
import { notesSchema } from "../helpers/validationSchema";
import Note from "../models/NotesModel";


export const GET_NOTES = async (
    req: any,
    res: any,
    next: NextFunction
) => {
    try {
        const user = req.user._id;

        res.json({ userId: user._id })
    } catch (error) {
        next(error)
    }
}

export const POST_ADD_NOTES = async (
    req: any,
    res: any,
    next: NextFunction
) => {
    try {
        // Validate note input
        const result = await notesSchema.validateAsync(req.body)

        // Create new note
        const note = new Note({
            userId: req.user._id,
            title: result.title,
            description: result.description
        })

        // Save note in the database
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        next(error)
    }
}

export const DELETE_NOTE = async (
    req: any,
    res: any,
    next: NextFunction) => {
    try {
        console.log(req.params.id);

        // Validate user input
        const noteId = req.params.id;
        if (noteId == null) res.send("Id not found!")
        const userId = req.user._id

        // Validate if note is exist in noteDB
        const note: any = await Note.findOne({ userId: userId, _id: noteId })
        if (note == null) return res.send("Note is not exist")

        // Delete the note from the noteDB
        const isDeleted = await note.delete()
        if (!isDeleted) return res.send("Error")

        res.send("Note deleted!")
    } catch (error) {
        next(error)
    }
}

export const EDIT_NOTE = async (
    req: any,
    res: any,
    next: NextFunction) => {
    try {
        // Validate user input
        const userId = req.user._id
        const noteId = req.params.id;
        if (noteId == null) res.send("Id not found!")
        console.log(req.body)
        const result = await notesSchema.validateAsync(req.body)

        // Validate if note is exist in noteDB
        const note: any = await Note.findOne({ userId: userId, _id: noteId })
        if (note == null) return res.send("Note is not exist")

        // Delete the note from the noteDB
        const isEdited = await note.updateOne({
            _id: note._id,
            userId: note.userId,
            title: result.title,
            description: result.description,
        })
        if (!isEdited) return res.send("Error")

        res.send("Note Edited!")
    } catch (error) {
        next(error)
    }
}

