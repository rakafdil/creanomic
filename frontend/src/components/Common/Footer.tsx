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
      className={`mt-12 md:mt-16 lg:mt-20 ${bgColor} flex flex-col lg:flex-row gap-8 sm:gap-12 md:gap-20 lg:gap-32 px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 md:py-10 lg:py-12 font-semibold text-white text-base sm:text-lg md:text-xl ${className}`}
    >
      {/* Logo & Description Section */}
      <div className="flex flex-col gap-4 md:gap-5 lg:flex-2">
        <Image 
          src="/assets/logo.svg" 
          alt="logo" 
          width={250} 
          height={250}
          className="w-[180px] sm:w-[200px] md:w-[220px] lg:w-[250px] h-auto"
        />
        <span className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
          Membangun ekosistem pangan lokal yang berkelanjutan dengan
          menghubungkan petani dan konsumen untuk masa depan yang lebih sehat.
        </span>
        <div className="flex text-white gap-3 sm:gap-4 md:gap-4.5 text-2xl sm:text-3xl">
          <FiFacebook className="cursor-pointer hover:fill-white transition-all" />
          <FiTwitter className="cursor-pointer hover:fill-white transition-all" />
          <FiInstagram className="cursor-pointer hover:fill-white transition-all" />
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="flex flex-col gap-4 md:gap-6 lg:flex-1">
        <span className="text-base sm:text-lg md:text-xl">Quick Links</span>
        <Link href="#" className="text-[#999] hover:text-white text-sm sm:text-base md:text-lg transition-colors">
          Home
        </Link>
        <Link href="#about-us" className="text-[#999] hover:text-white text-sm sm:text-base md:text-lg transition-colors">
          About Us
        </Link>
        <Link href="#services" className="text-[#999] hover:text-white text-sm sm:text-base md:text-lg transition-colors">
          Services
        </Link>
        <Link href="#contacts" className="text-[#999] hover:text-white text-sm sm:text-base md:text-lg transition-colors">
          Contacts
        </Link>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col gap-4 md:gap-6 lg:flex-1">
        <span className="text-base sm:text-lg md:text-xl">Contact</span>
        <Link
          href="mailto:contact@growthwell.com"
          className="text-[#999] hover:text-white text-sm sm:text-base md:text-lg transition-colors break-words"
        >
          contact@growthwell.com
        </Link>
        <Link
          href="https://wa.me/+62-123-456-7890"
          className="text-[#999] hover:text-white text-sm sm:text-base md:text-lg transition-colors"
        >
          +62-123-456-7890
        </Link>
        <Link
          href="https://share.google/Uln3eIHk8U89ZN5n3"
          className="text-[#999] hover:text-white text-sm sm:text-base md:text-lg transition-colors"
        >
          Jakarta, Indonesia
        </Link>
      </div>
    </footer>
  );
};

export default Footer;