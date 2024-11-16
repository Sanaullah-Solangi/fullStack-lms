"use client";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
import { addApplication } from "@/app/actions/applications";
import MyButton from "../MyButton/MyButton";
import { useLoader } from "@/app/context/LoaderContext";
import Loader from "../Loader/Loader";

const formSchema = z.object({
  CNIC: z.string().min(10),
  DOB: z.string(),
  address: z.string().min(12).max(150),
});

export function ApplicationDialog({ admission, session }) {
  const [open, setOpen] = useState(false);
  const isDesktop = true;
  const { loader, showLoader, hideLoader } = useLoader();

  if (isDesktop) {
    return loader ? (
      <Loader label={"Applying for Course..."} />
    ) : (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <MyButton text={"Apply Now"} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Apply Here</DialogTitle>
          </DialogHeader>
          <ApplicationForm
            admission={admission}
            session={session}
            setState={setOpen}
            showLoader={showLoader}
            hideLoader={hideLoader}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Apply</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Apply Here</DrawerTitle>
        </DrawerHeader>
        <ApplicationForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ApplicationForm({
  admission,
  session,
  setState,
  showLoader,
  hideLoader,
}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      CNIC: "42401-888888888-8",
      DOB: "01-Jan-2000",
      address: "Baldia Town Karachi",
    },
  });

  async function onSubmit(values) {
    showLoader();
    const obj = {
      course: admission.course._id,
      batch: admission.batch._id,
      admission: admission._id,
      user: session.id,
      info: {
        ...values,
      },
    };
    const submitApplication = await addApplication(obj);
    setState(false);
    hideLoader();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* CINC INPUT */}
        <FormField
          control={form.control}
          name="CNIC"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CNIC</FormLabel>
              <FormControl>
                <Input placeholder="42401-8888888-8" {...field} />
              </FormControl>
              <FormDescription>Enter your CNIC.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* DOB INPUT */}
        <FormField
          control={form.control}
          name="DOB"
          render={({ field }) => (
            // CNIC INPUT
            <FormItem>
              <FormLabel>DOB</FormLabel>
              <FormControl>
                <Input placeholder="01-Jan-2000" {...field} />
              </FormControl>
              <FormDescription>Enter your DOB.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* ADRESS INPUT */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            // CNIC INPUT
            <FormItem>
              <FormLabel>Adress</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>Enter your Adress.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          {form.formState.isSubmitting ? "Loading..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
