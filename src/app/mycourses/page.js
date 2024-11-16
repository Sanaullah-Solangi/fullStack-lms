import ApplicationCard from "@/components/ApplicationCard/ApplicationCard";
import { auth } from "../../../auth";
import { getApplications } from "../actions/applications";

export default async function myCourses() {
  const session = await auth();
  if (!session) redirect("/");
  const { applications } = await getApplications(session?.id);
  {
    return applications.length > 0 ? (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">My Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
          {applications.map((application) =>
            session.id == application.user._id ? (
              <ApplicationCard
                key={application._id}
                application={application}
              />
            ) : null
          )}
        </div>
      </div>
    ) : (
      <div className="h-full w-full flex justify-center items-center">
        Empty
      </div>
    );
  }
}
