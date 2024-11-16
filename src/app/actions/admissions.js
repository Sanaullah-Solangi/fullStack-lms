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

export async function updateAdmission(id, status) {
  const admission = await fetch(`${process.env.BASE_URL}api/admissions`, {
    method: "PUT",
    body: JSON.stringify({ id, status }),
  });
  if (admission.ok) {
    revalidatePath("/admin/admissions");
    return admission.ok;
  }
}

export async function getAdmissions(status = "") {
  let admissions = await fetch(
    `${process.env.BASE_URL}api/admissions?status=${status}`
  );
  admissions = await admissions.json();
  return admissions;
}

export async function getSingalAdmission(id) {
  console.log("Signal Admission lata hun");
  let admission = await fetch(`http://localhost:3000/api/admissions/${id}`);
  admission = await admission.json();
  return admission;
}
