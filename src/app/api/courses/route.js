import { connectDB } from "@/lib/dbConnect";
import { courseModel } from "@/lib/Models/CourseModel";

export async function POST(request) {
  await connectDB();
  const obj = await request.json();
  let newCourse = new courseModel({ ...obj });
  newCourse = await newCourse.save();

  return Response.json({
    error: false,
    msg: "Course Is Added Successfully",
    course: newCourse,
  });
}

export async function GET() {
  await connectDB();
  const courses = await courseModel.find();
  return Response.json({
    error: false,
    msg: "Courses Are Fetched Successfully",
    courses,
  });
}
