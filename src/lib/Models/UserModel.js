import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullName: String,
    email: { type: String, required: true },
    password: { type: String },
    provider: { type: String },
    profileImg: { type: String },
    role: { type: String, default: "user" },
    gender: String,
    address: String,
  },
  {
    timestamps: true,
  }
);

export const userModel =
  mongoose.models.Users || mongoose.model("Users", userSchema);
