import { connectDB } from "@/lib/dbConnect";
import { batchModel } from "@/lib/Models/BatchModel";
import { courseModel } from "@/lib/Models/CourseModel";

export async function POST(request) {
  await connectDB();
  const obj = await request.json();
  let newBatch = new batchModel({ ...obj });
  newBatch = await newBatch.save();

  return Response.json({
    error: false,
    msg: "Batch Is Added Successfully",
    batch: newBatch,
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

  const batches = await batchModel.find(query).populate("course", "title");
  return Response.json({
    error: false,
    msg: "Batchs Are Fetched Successfully",
    batches,
  });
}
