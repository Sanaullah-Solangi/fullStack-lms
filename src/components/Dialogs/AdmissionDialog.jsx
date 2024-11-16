"use client";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addAdmission } from "@/app/actions/admissions";
import Loader from "../Loader/Loader";

export function AdmissionDialog({ courses, batches }) {
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  const isDesktop = true;
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Open Admissions</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Admission</DialogTitle>
          </DialogHeader>
          {loader ? (
            <Loader />
          ) : (
            <AdmissionForm
              courses={courses}
              batches={batches}
              setState={setOpen}
              loader={loader}
              setLoader={setLoader}
            />
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Admission</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Open Admission</DrawerTitle>
        </DrawerHeader>
        <AdmissionForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function AdmissionForm({ className, courses, batches, setState, setLoader }) {
  const [chosenCourse, setChosenCourse] = useState("");

  return (
    <form
      action={async (formData) => {
        setLoader(true);
        try {
          await addAdmission(formData);
        } catch (error) {
          console.log(error);
        } finally {
          setState(false);
          setLoader(false);
        }
      }}
      className={cn("grid items-start gap-4", className)}
    >
      {/* Course */}
      <div className="grid gap-2">
        <Label htmlFor="course">Course</Label>
        <Select
          required
          onValueChange={(value) => setChosenCourse(value)}
          name="course"
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Course" />
          </SelectTrigger>
          <SelectContent>
            {courses?.map((course) => (
              <SelectItem key={course._id} value={course._id}>
                {course.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* BATCH */}
      {chosenCourse && (
        <div className="grid gap-2">
          <Label htmlFor="course">Batch</Label>
          <Select required name="batch">
            <SelectTrigger>
              <SelectValue placeholder="Select Batch" />
            </SelectTrigger>
            <SelectContent>
              {batches
                ?.filter((data) => data.course._id == chosenCourse)
                .map((batch) => (
                  <SelectItem key={batch._id} value={batch._id}>
                    {batch.title}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* START DATE */}
      <div className="grid gap-2">
        <Label htmlFor="startDate">startDate</Label>
        <Input
          required
          type="date"
          id="startDate"
          name="startDate"
          defaultValue=""
        />
      </div>
      {/* END DATE */}
      <div className="grid gap-2">
        <Label htmlFor="endDate">endDate</Label>
        <Input
          required
          type="date"
          id="endDate"
          name="endDate"
          defaultValue=""
        />
      </div>

      <Button type="submit">Add Batch</Button>
    </form>
  );
}
