"use client";
import * as React from "react";

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

// Mock data for Trainers and Courses
const trainers = [
  { id: "trainer1", name: "John Doe" },
  { id: "trainer2", name: "Jane Smith" },
  { id: "trainer3", name: "Alice Johnson" },
];

const courses = [
  { id: "course1", name: "Web and App Development" },
  { id: "course2", name: "App Development" },
  { id: "course3", name: "Python Development" },
];

export function UserDialog() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = true;

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add User</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
          </DialogHeader>
          <UserForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Add User</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add User</DrawerTitle>
        </DrawerHeader>
        <UserForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function UserForm({ className }) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid grid-cols-2 gap-2">
        {/* First Name */}
        <div className="grid gap-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input required type="text" id="firstName" defaultValue="" />
        </div>
        {/* Last Name */}
        <div className="grid gap-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input required type="text" id="lastName" defaultValue="" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {/* Gender */}
        <div className="grid gap-2">
          <Label htmlFor="gender">Gender</Label>
          <Input required type="text" id="gender" defaultValue="" />
        </div>

        {/* Roll */}
        <div className="grid gap-2">
          <Label htmlFor="roll">Roll</Label>
          <Input required type="text" id="roll" defaultValue="" />
        </div>
      </div>

      {/* Education */}
      <div className="grid gap-2">
        <Label htmlFor="education">Education</Label>
        <Input required type="text" id="education" defaultValue="" />
      </div>

      {/* CNIC */}
      <div className="grid gap-2">
        <Label htmlFor="cnic">CNIC</Label>
        <Input required type="number" id="cnic" defaultValue="" />
      </div>

      {/* Email */}
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input required type="text" id="email" defaultValue="" />
      </div>

      {/* Address */}
      <div className="grid gap-2">
        <Label htmlFor="address">Address</Label>
        <Input required type="text" id="address" defaultValue="" />
      </div>

      {/* Profile Pricture */}
      <div className="grid gap-2">
        <Label htmlFor="profilePricture">Profile Pricture</Label>
        <Input required type="file" id="profilePricture" defaultValue="" />
      </div>

      <Button type="submit">Add User</Button>
    </form>
  );
}
