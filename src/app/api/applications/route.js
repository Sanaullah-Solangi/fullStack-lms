import { connectDB } from "@/lib/dbConnect";
import { AdmissionModel } from "@/lib/Models/AdmissionModel";
import { ApplicationModel } from "@/lib/Models/ApplicationModel";
import { BatchModel } from "@/lib/Models/BatchModel";
import { CourseModel } from "@/lib/Models/CourseModel";
import { userModel } from "@/lib/Models/UserModel";
export async function POST(request) {
  await connectDB();
  const obj = await request.json();
  let newApplication = new ApplicationModel({ ...obj });
  newApplication = await newApplication.save();

  return Response.json({
    error: false,
    msg: "Application Is Added Successfully",
    application: newApplication,
  });
}

export async function GET(req) {
  await connectDB();
  const reqUrl = req.url;
  const { searchParams } = new URL(reqUrl);
  console.log("========================================================");
  console.log(reqUrl);
  let query = {};
  if (searchParams.get("course")) {
    query.course = searchParams.get("course");
  }
  if (searchParams.get("batch")) {
    query.batch = searchParams.get("batch");
  }
  if (searchParams.get("admission")) {
    query.admission = searchParams.get("admission");
  }
  // if (searchParams.get("user")) {
  //   query.user = searchParams.get("user");
  // }

  console.log("it is the query=>", query);
  const applications = await ApplicationModel.find(query)
    .populate("course", "title")
    .populate("batch", "title")
    .populate("admission", "startDate endDate status")
    .populate("user", "fullName email profileImg");
  return Response.json({
    error: false,
    msg: "Applications Are Fetched Successfully",
    applications,
  });
}
