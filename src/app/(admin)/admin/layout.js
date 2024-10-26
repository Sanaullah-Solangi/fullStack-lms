import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <Tabs defaultValue="admin" className="w-full">
      <TabsList className="w-full flex justify-center p-0 border-b border-gray-500 bg-purple-200">
        <Link href={"/admin"}>
          <TabsTrigger
            className="py-4 px-6 uppercase font-mono font-semibold border-x border-gray-500"
            value="courses"
          >
            Admin
          </TabsTrigger>
        </Link>
        <Link href={"/admin/dashboard"}>
          <TabsTrigger
            className="py-4 px-6 uppercase font-mono font-semibold border-r border-gray-500"
            value="dashboard"
          >
            Dashboard
          </TabsTrigger>
        </Link>
        <Link href={"/admin/courses"}>
          <TabsTrigger
            className="py-4 px-6 uppercase font-mono font-semibold border-r border-gray-500"
            value="courses"
          >
            Courses
          </TabsTrigger>
        </Link>
        <Link href={"/admin/batches"}>
          <TabsTrigger
            className="py-4 px-6 uppercase font-mono font-semibold border-r border-gray-500"
            value="batches"
          >
            Batches
          </TabsTrigger>
        </Link>
        <Link href={"/admin/trainers"}>
          <TabsTrigger
            className="py-4 px-6 uppercase font-mono font-semibold border-r border-gray-500"
            value="trainers"
          >
            Trainers
          </TabsTrigger>
        </Link>
        <Link href={"/admin/students"}>
          <TabsTrigger
            className="py-4 px-6 uppercase font-mono font-semibold border-r border-gray-500"
            value="students"
          >
            Students
          </TabsTrigger>
        </Link>
      </TabsList>
      <TabsContent value="admin">{children}</TabsContent>
      <TabsContent value="dashboard">{children}</TabsContent>
      <TabsContent value="trainers">{children}</TabsContent>
      <TabsContent value="courses">{children}</TabsContent>
      <TabsContent value="batches">{children}</TabsContent>
      <TabsContent value="students">{children}</TabsContent>
    </Tabs>
  );
}
