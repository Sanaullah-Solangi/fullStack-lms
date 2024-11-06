import mongoose from "mongoose";
import { Schema } from "mongoose";

const batchSchema = new Schema(
  {
    title: { type: String },
    description: String,
    course: { type: mongoose.Types.ObjectId, ref: "Courses" },
    status: {
      type: String,
      default: "pending",
      enum: [
        "pending",
        "admission-open",
        "admission-close",
        "ongoing",
        "completed",
      ],
    },
  },
  {
    timestamps: true,
  }
);

export const batchModel =
  mongoose.models.Batches || mongoose.model("Batches", batchSchema);
