"use client";
import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
// import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addCourse } from "@/app/actions/courses";

export function CourseDialog() {
  const [open, setOpen] = useState(false);
  const isDesktop = true;

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">Add Course</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Course</DialogTitle>
            <DialogDescription>
              Add New Course From here. Click Add when you're done.
            </DialogDescription>
          </DialogHeader>
          <CourseForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Add Course</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add Course</DrawerTitle>
          <DrawerDescription>
            Add New Course From here. Click Add when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <CourseForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function CourseForm({ className }) {
  return (
    <form
      action={addCourse}
      className={cn("grid items-start gap-4", className)}
    >
      {/* TITLE */}
      <div className="grid gap-2">
        <Label htmlFor="email">Course</Label>
        <Input name="title" type="text" id="course" placeholder="Add Course" />
      </div>
      {/* DESCRIPTION */}
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Input
          name="description"
          id="description"
          placeholder="Add descrption"
        />
      </div>
      {/* DURATION */}
      <div className="grid gap-2">
        <Label htmlFor="duration">Duration</Label>
        <Input name="duration" id="duration" placeholder="Add Duration" />
      </div>
      {/* ELEGIBLITY */}
      <div className="grid gap-2">
        <Label htmlFor="eligibility">Eligibility</Label>
        <Input name="eligibility" id="eligibility" placeholder="Add Duration" />
      </div>
      {/* THUMBNAIL */}
      <div className="grid gap-2">
        <Label htmlFor="thumbnail">Thumbnail</Label>
        <Input
          type={"url"}
          name="thumbnail"
          id="thumbnail"
          placeholder="Add Duration"
        />
      </div>
      <Button type="submit">Add Course</Button>
    </form>
  );
}
