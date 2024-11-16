import { connectDB } from "@/lib/dbConnect";
import { AdmissionModel } from "@/lib/Models/AdmissionModel";
import { ApplicationModel } from "@/lib/Models/ApplicationModel";
import { BatchModel } from "@/lib/Models/BatchModel";
import { CourseModel } from "@/lib/Models/CourseModel";
import { userModel } from "@/lib/Models/UserModel";
export async function GET(request, { params }) {
  await connectDB();
  const url = request.url;
  const { id } = await params;

  const admission = await AdmissionModel.findOne({ _id: id })
    .populate("course", "title description")
    .populate("batch", "title")
    .lean();

  const applications = await ApplicationModel.find({ admission: id }).populate(
    "user",
    "fullName email profileImg"
  );
  return Response.json({
    error: false,
    msg: "Admission Details Are Fetched",
    admission: { ...admission, applications },
  });
}
