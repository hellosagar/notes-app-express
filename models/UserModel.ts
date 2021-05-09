import mongoose from "mongoose";

const userSchema: mongoose.Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
      },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  });

  const User = mongoose.model("User", userSchema);

export default User;
