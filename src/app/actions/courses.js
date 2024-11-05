"use server";

export async function addCourse(params) {}

export async function getCourse() {
  let courses = await fetch(`${process.env.BASE_URL}api/courses`);
}
