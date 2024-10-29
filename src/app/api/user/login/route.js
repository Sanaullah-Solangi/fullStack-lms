import { connectDB } from "@/lib/dbConnect";
import { userModel } from "@/lib/Models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request) {
  await connectDB();
  const obj = await request.json();
  const user = await userModel.findOne({ email: obj.email });
  if (!user)
    return Response.json(
      {
        error: true,
        msg: "User Doesn't Exits",
      },
      {
        status: 404,
      }
    );

  const isPasswordMatch = await bcrypt.compare(obj.password, user.password);

  if (!isPasswordMatch)
    return Response.json(
      {
        error: true,
        msg: "Password is not valid",
      },
      {
        status: 400,
      }
    );

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_KEY
  );

  return Response.json({
    error: false,
    user,
    token,
    msg: "User LogIn Successfully",
  });
}
