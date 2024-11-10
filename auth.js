import { connectDB } from "@/lib/dbConnect";
import { userModel } from "@/lib/Models/UserModel";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import Swal from "sweetalert2";
const handleLoginUser = async (info) => {
  await connectDB();
  const user = await userModel.findOne({ email: info.email });
  if (user) {
    return user;
  } else {
    const obj = {
      fullName: info.name,
      email: info.email,
      provider: "google",
      profileImg: info.picture,
    };
    let newUser = userModel(obj);
    newUser = await newUser.save();
    return newUser;
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        let res = await fetch(
          `https://full-stack-lms-nine.vercel.app/api/user/login`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );
        res = await res.json();
        user = res.user;
        if (user) {
          return user;
        } else {
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        const user = await handleLoginUser(profile);
      }
      return true;
    },
    async jwt({ token }) {
      const user = await handleLoginUser(token);
      const Mytoken = {
        id: user._id,
        role: user.role,
        picture: user?.profileImg,
        name: user?.fullName,
        email: user.email,
      };
      return Mytoken;
    },
    session({ session, token }) {
      session = {
        id: token.id,
        role: token.role,
        image: token.picture,
        name: token.name,
        email: token.email,
      };
      return session;
    },
  },
});
