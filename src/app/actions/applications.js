"use server";

import { revalidatePath } from "next/cache";

export async function addApplication(obj) {
  const application = await fetch(`${process.env.BASE_URL}api/applications`, {
    method: "POST",
    body: JSON.stringify(obj),
    cache: "no-cache",
  });

  if (application.ok) {
    revalidatePath("/admin/applications");
  }
}

export async function updateApplication(id, status) {
  const application = await fetch(`${process.env.BASE_URL}api/applications`, {
    method: "PUT",
    body: JSON.stringify({ id, status }),
  });
  if (application.ok) {
    revalidatePath("/admin/applications");
    return application.ok;
  }
}

export async function getApplications({
  course = "",
  batch = "",
  admission = "",
  user = "",
}) {
  console.log("user id in action", user);
  let applications = await fetch(
    `${process.env.BASE_URL}api/applications?course=${course}&batch=${batch}&admission=${admission}&user=${user}`
  );
  applications = await applications.json();
  return applications;
}
