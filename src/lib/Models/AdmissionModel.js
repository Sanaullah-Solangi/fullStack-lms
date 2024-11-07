import mongoose from "mongoose";
import { Schema } from "mongoose";

const admissionSchema = new Schema(
  {
    course: { type: mongoose.Types.ObjectId, ref: "Courses" },
    batch: { type: mongoose.Types.ObjectId, ref: "Batches" },
    startDate: String,
    endDate: String,
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "open", "close"],
    },
  },
  {
    timestamps: true,
  }
);
if (mongoose.models.Admission) {
  mongoose.models.Admission.schema = admissionSchema;
}
export const AdmissionModel =
  mongoose.models.Admissions || mongoose.model("Admissions", admissionSchema);
