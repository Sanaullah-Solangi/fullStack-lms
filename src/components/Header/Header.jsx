import Link from "next/link";
import { auth, signOut } from "../../../auth";
import MyAvatar from "../Avatar/Avatar";
import { Button } from "../ui/button";

export default async function Header() {
  const session = await auth();
  // console.log("session in header =>", session);
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
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
          <span className="ml-3 text-xl font-bold">
            {session ? session.email : "TailBlocks"}
          </span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link
            href={"/"}
            className="mr-5 hover:text-gray-900 uppercase font-bold text-xl point"
          >
            Home
          </Link>
          <Link
            href={"/admin"}
            className="mr-5 hover:text-gray-900 uppercase font-bold text-xl point"
          >
            admin
          </Link>
          <Link
            href={"/"}
            className="mr-5 hover:text-gray-900 uppercase font-bold text-xl point"
          >
            Home
          </Link>
          <Link
            href={"/"}
            className="mr-5 hover:text-gray-900 uppercase font-bold text-xl point"
          >
            Home
          </Link>
        </nav>
        {session ? (
          <MyAvatar
            image={session ? session.image : "https://github.com/shadcn.png"}
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
                  className="font-bold text-lg font-mono"
                >
                  Log Out
                </Button>
              </form>
            }
          />
        ) : (
          <Link href={"/signin"}>
            <span className="font-bold text-xl text-white py-2 px-4 rounded font-mono bg-blue-500">
              LogIn
            </span>
          </Link>
        )}
      </div>
    </header>
  );
}
