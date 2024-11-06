"use server";

import { revalidatePath } from "next/cache";

export async function addBatche(formData) {
  const obj = {
    title: formData.get("title"),
    description: formData.get("description"),
    course: formData.get("course"),
  };
  const batche = await fetch(`${process.env.BASE_URL}api/batches`, {
    method: "POST",
    body: JSON.stringify(obj),
  });

  if (batche.ok) {
    revalidatePath("/admin/batches");
  }
}

export async function getBatches() {
  let batches = await fetch(`${process.env.BASE_URL}api/batches`);
  batches = await batches.json();
  return batches;
}
