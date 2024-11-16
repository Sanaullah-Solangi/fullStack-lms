import { getBatches } from "@/app/actions/batches";
import { getCourse } from "@/app/actions/courses";
import { BatchesTable } from "@/components/DataTables/BatchTable";
import { BatchDialog } from "@/components/Dialogs/BatchDialog";

export default async function Batches() {
  const { batches } = await getBatches();
  const { courses } = await getCourse();
  return (
    <div className="container w-screen flex flex-col items-center justify-center gap-2">
      <div className="flex justify-between w-full">
        <h1 className="text-5xl uppercase font-medium font-mono">Batches</h1>
        <BatchDialog courses={courses} />
      </div>
      <BatchesTable data={batches} />
    </div>
  );
}
