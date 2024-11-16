import { addCourse, getCourse } from "@/app/actions/courses";
import { CourseTable } from "@/components/DataTables/CourseTable";
import { CourseDialog } from "@/components/Dialogs/CourseDialog";
import { Button } from "@/components/ui/button";

export default async function Courses() {
  const { courses } = await getCourse();
  return (
    <div className="container w-full flex flex-col items-center justify-center gap-2">
      <div className="flex justify-between w-full">
        <h1 className="text-5xl uppercase font-medium font-mono">Courses</h1>
        <CourseDialog />
      </div>
      <CourseTable data={courses} />
    </div>
  );
}
