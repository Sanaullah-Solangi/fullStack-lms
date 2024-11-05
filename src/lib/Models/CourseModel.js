import mongoose from "mongoose";
import { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    title: { type: String, unique: true },
    description: String,
    duration: String,
    eligibility: [String],
  },
  {
    timestamps: true,
  }
);

export const courseModel =
  mongoose.models.Courses || mongoose.model("Courses", courseSchema);