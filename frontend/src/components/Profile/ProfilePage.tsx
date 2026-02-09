"use client";
import React, { useState } from "react";
import { Pencil, Store } from "lucide-react";
import Link from "next/link";
import ProfileSidebar from "./ProfileSidebar";
import Image from "next/image";
import { Button } from "../ui/button";
import axios from "axios";
import { BASE_URL } from "@/app/page";
import { useMutation } from "@tanstack/react-query";
import ConfirmationPopUp from "../Common/ConfirmationPopUp";
import Loading from "../Common/Loading";
import { AlertDialog } from "../ui/alert-dialog";
import ErrorModal from "../Common/ErrorModal";

async function changeToSeller() {
  const response = await axios.post(
    `${BASE_URL}seller/become-seller`,
    { ktp_url: "", nik: 3500000000000099 },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
}

export default function ProfilePage(user: any) {
  const toSeller = useMutation({
    mutationFn: changeToSeller,
  });

  const [formData, setFormData] = useState({
    username: user.user.username,
    firstName: user.user.first_name,
    lastName: user.user.last_name,
    email: user.user.email,
    phone: "+628193166666",
  });

  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  return (
    <>
      <div className="flex flex-col items-start flex-1">
        {toSeller.isError && <ErrorModal error={toSeller.error} />}
        {modalOpen && (
          <ConfirmationPopUp
            onAcc={toSeller.mutate}
            text={"Are You Sure To Become a Seller?"}
            setModal={setModalOpen}
          />
        )}
        <div className="flex justify-between w-full">
          <div className="relative mb-8 self-center md:self-start">
            <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-full overflow-hidden bg-[#083D57]">
              <Image
                src={user.user.profile_picture || "/assets/default-avatar.png"}
                alt="avatar"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 128px, 160px"
              />
            </div>
            <button
              type="button"
              aria-label="Edit avatar"
              title="Edit avatar"
              className="absolute bottom-1 right-1 bg-[#0A3917] p-2 rounded-full hover:bg-green-900 transition"
            >
              <Pencil className="text-white w-5 h-5 md:w-7 md:h-7" />
            </button>
          </div>
          {user.user.role === "buyer" || toSeller.isSuccess ? (
            <Button
              size={"lg"}
              className="cursor-pointer bg-green-800 hover:bg-green-900"
              onClick={() => setModalOpen(true)}
            >
              {toSeller.isPending ? "Loading..." : "Become a seller"}
            </Button>
          ) : (
            <div className="flex gap-2">
              <button
                type="button"
                className="bg-[#0A3917] rounded-full hover:bg-green-900 transition-all h-fit p-3 cursor-pointer"
              >
                <Store className="text-white w-5 h-5 md:w-7 md:h-7" />
              </button>
            </div>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 w-full max-w-lg sm:max-w-3xl"
        >
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex flex-col w-full sm:w-1/2">
              <label className="text-base md:text-lg mb-1 font-medium">
                First Name
              </label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="border border-gray-300 rounded-md p-3 md:p-4 w-full focus:outline-none focus:ring-1 focus:ring-gray-800"
              />
            </div>
            <div className="flex flex-col w-full sm:w-1/2">
              <label className="text-base md:text-lg mb-1 font-medium">
                Last Name
              </label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="border border-gray-300 rounded-md p-3 md:p-4 w-full focus:outline-none focus:ring-1 focus:ring-gray-800"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-base md:text-lg mb-1 font-medium">
              Username
            </label>
            <input
              name="username"
              type="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="border border-gray-300 rounded-md p-3 md:p-4 w-full focus:outline-none focus:ring-1 focus:ring-grey-800"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-base md:text-lg mb-1 font-medium">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="border border-gray-300 rounded-md p-3 md:p-4 w-full focus:outline-none focus:ring-1 focus:ring-grey-800"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-base md:text-lg mb-1 font-medium">
              Phone
            </label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="border border-gray-300 rounded-md p-3 md:p-4 w-full focus:outline-none focus:ring-1 focus:ring-grey-800"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto self-center sm:self-start mt-4 bg-[#0A3917] text-white py-3 px-6 rounded-lg hover:bg-green-900 transition"
          >
            Update Changes
          </button>
        </form>
      </div>
    </>
  );
}
