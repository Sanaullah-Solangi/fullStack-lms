import { connectDB } from "@/lib/dbConnect";
import { userModel } from "@/lib/Models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request) {
  await connectDB();
  const obj = await request.json();
  console.log(obj);
  const user = await userModel.findOne({ email: obj.email });
  if (user)
    return Response.json(
      {
        error: true,
        msg: "User Already Exits",
      },
      {
        status: 403,
      }
    );

  var salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(obj.password, salt);
  obj.password = hashedPassword;

  let newUser = new userModel({ ...obj });
  await newUser.save();
  const token = jwt.sign(
    { id: newUser._id, role: newUser.role },
    process.env.JWT_KEY
  );

  return Response.json({
    error: false,
    user: newUser,
    token,
    msg: "User is registered successfully",
  });
}

export async function GET(request) {
  const obj = request.json();
  return Response.json({
    msg: "Api is working properly",
  });
}
