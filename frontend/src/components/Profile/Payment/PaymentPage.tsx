import React from "react";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import ProfileSidebar from "../ProfileSidebar";
import PaymentMethods from "./PaymentMethods";

export default function paymentPage() {
  return (
    <div className="min-h-screen bg-white text-[#0A3917] flex justify-center py-6 sm:py-8 lg:py-0 px-4 sm:px-6 lg:px-0">
      <PaymentMethods />
    </div>
  );
}
