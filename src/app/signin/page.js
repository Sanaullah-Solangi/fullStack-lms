import { redirect } from "next/navigation";
import { auth, signIn } from "../../../auth";
import image from "../../assets/images/download-removebg-preview.png";
import Image from "next/image";
export default async function SignIn() {
  const session = await auth();
  if (session) redirect("/");
  console.log(session);
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex flex-col items-center justify-center gap-5 w-[500px] h-[400px] mx-auto shadow-xl p-5">
        <form
          className="flex flex-col gap-2 w-full"
          action={async (formData) => {
            "use server";
            await signIn("credentials", formData);
          }}
        >
          <label className="flex flex-col w-full">
            Email
            <input
              className="border-2 border-gray-400 rounded-md py-2 px-4 outline-none shadow-none inline-block text-xl"
              name="email"
              type="email"
            />
          </label>
          <label className="flex flex-col w-full">
            Password
            <input
              className="border-2 border-gray-400 rounded-md py-2 px-4 outline-none shadow-none inline-block text-xl"
              name="password"
              type="password"
            />
          </label>
          <button
            className="rounded p-4 text-3xl border-2 border-blue-500 bg-blue-300  font-bold"
            type="submit"
          >
            Sign In
          </button>
        </form>
        <form
          className="w-full"
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button
            className="rounded bg-slate-200 border-2 border-blue-500 hover:bg-blue-300  p-4 text-xl font-bold w-full flex justify-center items-center gap-2"
            type="submit"
          >
            <Image
              alt="SignIn With Google"
              width={"50"}
              height={"50"}
              src={image}
            />
            Signin with Google
          </button>
        </form>
      </div>
    </div>
  );
}
