"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

export default function MyAvatar({ image, form }) {
  const [show, setShow] = useState(false);
  return (
    <div
      onClick={() => {
        show ? setShow(false) : setShow(true);
      }}
      className="relative cursor-pointer"
    >
      <Avatar>
        <AvatarImage src={image} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {
        <div
          style={{
            left: `${show ? "-200%" : "0"}`,
            opacity: `${show ? "100%" : "0"}`,
          }}
          className="absolute top=[100%] transition-all duration-100 ease-linear"
        >
          {form}
        </div>
      }
    </div>
  );
}
