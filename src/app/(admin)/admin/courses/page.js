import { CourseTable } from "@/components/DataTables/CourseTable";
import { CourseDialog } from "@/components/Dialogs/CourseDialog";
import { Button } from "@/components/ui/button";

export default function Courses() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-2">
      <div className="flex justify-between w-full">
        <h1 className="text-5xl uppercase font-medium font-mono">Courses</h1>
        <CourseDialog />
      </div>
      <CourseTable />
    </div>
  );
}
