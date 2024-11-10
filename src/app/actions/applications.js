"use server";

import { revalidatePath } from "next/cache";

export async function addApplication(obj) {
  const application = await fetch(`${process.env.BASE_URL}api/applications`, {
    method: "POST",
    body: JSON.stringify(obj),
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

export async function getAdmissions(status = "") {
  let admissions = await fetch(
    `${process.env.BASE_URL}api/admissions?status=${status}`
  );
  admissions = await admissions.json();
  return admissions;
}
