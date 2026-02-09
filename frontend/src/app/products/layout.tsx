"use client";
import { Dot } from "lucide-react";
import React, { useState } from "react";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openChat, setOpenChat] = useState(false);
  return (
    <div className="relative max-w-[1920px]">
      {children}
      <div className="flex flex-col fixed right-12 bottom-0 bg-white border-2 w-80  rounded-tr-2xl rounded-tl-2xl ">
        <button
          className="flex justify-center items-center text-xl font-medium w-full cursor-pointer mx-auto py-4"
          onClick={() => {
            setOpenChat(!openChat);
          }}
        >
          Chat <Dot className="w-10 h-10 animate-pulse text-green-500" />
        </button>
        {openChat && <div className="text-xl"> HALOOOOOOOOOOOO</div>}
      </div>
    </div>
  );
}
