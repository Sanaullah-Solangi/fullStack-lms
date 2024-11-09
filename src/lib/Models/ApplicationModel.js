import mongoose from "mongoose";
import { Schema } from "mongoose";

const applicationSchema = new Schema(
  {
    course: { type: mongoose.Types.ObjectId, ref: "Courses" },
    batch: { type: mongoose.Types.ObjectId, ref: "Batches" },
    admission: { type: mongoose.Types.ObjectId, ref: "Admissions" },
    user: { type: mongoose.Types.ObjectId, ref: "Users" },
    info: {
      CNIC: String,
      DOB: String,
      address: String,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "enrolled", "rejected"],
    },
  },
  {
    timestamps: true,
  }
);

export const ApplicationModel =
  mongoose.models.Applications ||
  mongoose.model("Applications", applicationSchema);
