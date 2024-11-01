import { BatchesTable } from "@/components/DataTables/BatchTable";
import { BatchDialog } from "@/components/Dialogs/BatchDialog";

export default function Batches() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-2">
      <div className="flex justify-between w-full">
        <h1 className="text-5xl uppercase font-medium font-mono">Batches</h1>
        <BatchDialog />
      </div>
      <BatchesTable />
    </div>
  );
}
