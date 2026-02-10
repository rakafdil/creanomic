"use client";
import { Dot } from "lucide-react";
import React, { useState } from "react";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openChat, setOpenChat] = useState(false);
  return <div className="relative max-w-[1920px]">{children}</div>;
}
