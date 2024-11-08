import { getAdmissions } from "@/app/actions/admissions";
import { getBatches } from "@/app/actions/batches";
import { getCourse } from "@/app/actions/courses";
import { AdmissionsTable } from "@/components/DataTables/AdmissionTable";
import { AdmissionDialog } from "@/components/Dialogs/AdmissionDialog";

export default async function Admissions() {
  const { admissions } = await getAdmissions();
  const { courses } = await getCourse();
  const { batches } = await getBatches();
  return (
    <div className="container h-screen w-screen flex flex-col items-center justify-center gap-2">
      <div className="flex justify-between w-full">
        <h1 className="text-5xl uppercase font-medium font-mono">Admissions</h1>
        <AdmissionDialog courses={courses} batches={batches} />
      </div>
      <AdmissionsTable data={admissions} />
    </div>
  );
}
