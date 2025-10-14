"use client";
import Footer from "./Footer";
import { usePathname } from "next/navigation";

export default function ConditionalFooter() {
  const pathname = usePathname();
  return pathname === "/" ? <Footer /> : <Footer bgColor="bg-green-950" />;
}
