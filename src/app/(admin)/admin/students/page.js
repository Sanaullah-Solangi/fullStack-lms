import { UsersTable } from "@/components/DataTables/UserTable";
import { UserDialog } from "@/components/Dialogs/UserDialog";

export default function Students() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-2">
      <div className="flex justify-between w-full">
        <h1 className="text-5xl uppercase font-medium font-mono">Students</h1>
        <UserDialog />
      </div>
      <UsersTable />
    </div>
  );
}
