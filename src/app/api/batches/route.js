import { connectDB } from "@/lib/dbConnect";
import { BatchModel } from "@/lib/Models/BatchModel";
import { CourseModel } from "@/lib/Models/CourseModel";

export async function POST(request) {
  await connectDB();
  const obj = await request.json();
  let newBatch = new BatchModel({ ...obj });
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

  const batches = await BatchModel.find(query).populate("course", "title");
  return Response.json({
    error: false,
    msg: "Batchs Are Fetched Successfully",
    batches,
  });
}
