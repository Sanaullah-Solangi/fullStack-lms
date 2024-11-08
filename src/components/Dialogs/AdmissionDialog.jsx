"use client";
import { useState } from "react";

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

export function AdmissionDialog({ courses, batches }) {
  const [open, setOpen] = useState(false);
  const isDesktop = true;

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add Batch</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Batch</DialogTitle>
          </DialogHeader>
          <BatchForm courses={courses} batches={batches} setState={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Add Batch</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add Batch</DrawerTitle>
        </DrawerHeader>
        <BatchForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function BatchForm({ className, courses, batches, setState }) {
  const [chosenCourse, setChosenCourse] = useState("");
  return (
    <form
      action={(formData) => {
        setState(false);
        addAdmission(formData);
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
