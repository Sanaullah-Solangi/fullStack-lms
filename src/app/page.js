import CourseSection from "@/components/CourseSection/CourseSection";
import Link from "next/link";
import { getAdmissions } from "./actions/admissions";
import { auth } from "../../auth";
export default async function Home() {
  const { admissions } = await getAdmissions("open");
  const session = await auth();
  console.log(session);
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-2">
      <h1 className="text-5xl font-medium font-mono">HOME</h1>
      <Link
        href={"/admin"}
        className="capitalize text-2xl font-mono underline "
      >
        click here to go to the admin page
      </Link>
      <CourseSection session={session} admissions={admissions} />
    </div>
  );
}
