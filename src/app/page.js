import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-2">
      <h1 className="text-5xl font-medium font-mono">HOME</h1>
      <Link
        href={"/admin"}
        className="capitalize text-2xl font-mono underline "
      >
        click here to go to the admin page
      </Link>
    </div>
  );
}
