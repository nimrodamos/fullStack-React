import mongoose from "mongoose";

const User =
  mongoose.models.User ||
  mongoose.model(
    "User",
    new mongoose.Schema({
      username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    })
  );

export default User;
