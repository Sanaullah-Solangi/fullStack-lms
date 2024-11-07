import { connectDB } from "@/lib/dbConnect";
import { AdmissionModel } from "@/lib/Models/AdmissionModel";
import { BatchModel } from "@/lib/Models/BatchModel";
import { CourseModel } from "@/lib/Models/CourseModel";
export async function POST(request) {
  await connectDB();
  const obj = await request.json();
  let newAdmission = new AdmissionModel({ ...obj });
  newAdmission = await newAdmission.save();

  return Response.json({
    error: false,
    msg: "Admission Is Added Successfully",
    Admission: newAdmission,
  });
}

export async function GET(req) {
  await connectDB();
  const reqUrl = req.url;
  const { searchParams } = new URL(reqUrl);

  let query = {};
  if (searchParams.get("course")) {
    query.course = searchParams.get("course");
  }
  if (searchParams.get("batch")) {
    query.batch = searchParams.get("batch");
  }
  if (searchParams.get("status")) {
    query.status = searchParams.get("status");
  }

  console.log(query);
  const admissions = await AdmissionModel.find(query)
    .populate("course", "title description")
    .populate("batch", "title");
  return Response.json({
    error: false,
    msg: "Admissions Are Fetched Successfully",
    admissions,
  });
}
