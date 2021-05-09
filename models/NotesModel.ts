import mongoose from "mongoose";

const noteSchema: mongoose.Schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Note = mongoose.model("Notes", noteSchema);

export default Note;
