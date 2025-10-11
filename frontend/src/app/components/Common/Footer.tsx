import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";

interface FooterProps {
  bgColor?: string;
  className?: string;
}

const Footer: React.FC<FooterProps> = ({
  bgColor = "bg-black",
  className = "",
}) => {
  return (
    <footer
      className={`${bgColor} flex gap-32 px-20 py-12 font-semibold text-white text-xl ${className}`}
    >
      <div className="flex flex-2 flex-col gap-5">
        <Image src="/assets/logo.svg" alt="logo" width={250} height={250} />
        <span>
          Membangun ekosistem pangan lokal yang berkelanjutan dengan
          menghubungkan petani dan konsumen untuk masa depan yang lebih sehat.
        </span>
        <div className="flex text-white gap-4.5 text-3xl">
          <FiFacebook className="cursor-pointer hover:fill-white" />
          <FiTwitter className="cursor-pointer hover:fill-white" />
          <FiInstagram className="cursor-pointer hover:fill-white" />
        </div>
      </div>
      <div className="flex flex-1 gap-6 flex-col">
        <span>Quick Links</span>
        <Link href="#" className="text-[#999] hover:text-white">
          Home
        </Link>
        <Link href="#about-us" className="text-[#999] hover:text-white">
          About Us
        </Link>
        <Link href="#services" className="text-[#999] hover:text-white">
          Services
        </Link>
        <Link href="#contacts" className="text-[#999] hover:text-white">
          Contacts
        </Link>
      </div>
      <div className="flex flex-1 gap-6 flex-col">
        <span>Contact</span>
        <Link
          href="mailto:contact@growthwell.com"
          className="text-[#999] hover:text-white"
        >
          contact@growthwell.com
        </Link>
        <Link
          href="https://wa.me/+62-123-456-7890"
          className="text-[#999] hover:text-white"
        >
          +62-123-456-7890
        </Link>
        <Link
          href="https://share.google/Uln3eIHk8U89ZN5n3"
          className="text-[#999] hover:text-white"
        >
          Jakarta, Indonesia
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
