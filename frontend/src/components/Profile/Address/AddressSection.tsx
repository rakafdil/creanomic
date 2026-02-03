import React from "react";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import ProfileSidebar from "../ProfileSidebar";

export default function AddressSection() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black justify-center py-8 md:py-12 px-4 md:px-0">
      <AddressCard
        name="Brawnih"
        address="2426 Royal Ln. Mesa, New Jersey 45872"
      />
      <AddressForm />
    </div>
  );
}
