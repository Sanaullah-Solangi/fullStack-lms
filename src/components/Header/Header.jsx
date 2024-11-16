import Link from "next/link";
import MyAvatar from "../Avatar/Avatar";
import MyButton from "../MyButton/MyButton";
import { auth, signOut } from "../../../auth";
import { Button } from "../ui/button";
export default async function Header() {
  const session = await auth();
  return (
    <header className=" body-font bg-red-800">
      <div className="container mx-auto flex flex-wrap md:px-5 px-0 py-3 md:py-0 flex-col md:flex-row items-center gap-2 ">
        <a className="flex title-font font-medium items-center text-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="ml-3 text-xl font-bold text-gray-200">
            {session ? session.email : "TailBlocks"}
          </span>
        </a>
        <nav className="md:ml-auto w-full md:w-auto bg-gray-400 md:bg-transparent flex md:flex-wrap items-center text-base md:justify-center justify-between">
          <Link
            href={"/"}
            className="hover:bg-gray-300 text-gray-200 hover:text-gray-600 w-full md:w-auto flex justify-center items-center py-4 px-5  uppercase font-bold text-xl point"
          >
            Home
          </Link>
          <Link
            href={"/admin"}
            className="hover:bg-gray-300 text-gray-200 hover:text-gray-600 w-full md:w-auto flex justify-center items-center py-4 px-5  uppercase font-bold text-xl point"
          >
            admin
          </Link>
          <Link
            href={"/mycourses"}
            className="hover:bg-gray-300 text-gray-200 hover:text-gray-600 w-full md:w-auto flex justify-center items-center py-4 px-5  uppercase font-bold text-xl point"
          >
            MyCourses
          </Link>
          <Link
            href={"/"}
            className="hover:bg-gray-300 text-gray-200 hover:text-gray-600 w-full md:w-auto flex justify-center items-center py-4 px-5  uppercase font-bold text-xl point"
          >
            Home
          </Link>
        </nav>
        {session ? (
          <MyAvatar
            image={session?.image || "https://github.com/shadcn.png"}
            form={
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <Button
                  type={"submit"}
                  variant="destructive"
                  className="font-bold text-lg font-mono px-5 py-3"
                >
                  Log Out
                </Button>
              </form>
            }
          />
        ) : (
          <Link href={"/signin"}>
            <MyButton text={"Log In"} />
          </Link>
        )}
      </div>
    </header>
  );
}
