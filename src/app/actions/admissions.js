"use server";

import { revalidatePath } from "next/cache";

export async function addAdmission(formData) {
  const obj = {
    course: formData.get("course"),
    batch: formData.get("batch"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
  };
  const admission = await fetch(`${process.env.BASE_URL}api/admissions`, {
    method: "POST",
    body: JSON.stringify(obj),
  });

  if (admission.ok) {
    revalidatePath("/admin/admissions");
  }
}

export async function getAdmissions() {
  let admissions = await fetch(`${process.env.BASE_URL}api/admissions`);
  admissions = await admissions.json();
  return admissions;
}
