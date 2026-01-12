"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const navItems = [
  { label: "Home", id: "home" },
  { label: "About Us", id: "about-us" },
  { label: "Services", id: "services" },
  { label: "Contacts", id: "contacts" },
];

const Navbar = () => {
  const [active, setActive] = useState<string>("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { root: null, threshold: 0.35 }
    );

    navItems.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleScroll = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <nav className="absolute top-0 left-0 w-full px-6 md:px-[7.5rem] py-6 z-[100] text-white font-semibold font-inter text-lg">
      <div className="max-w-[1920px] mx-auto flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/assets/logo.svg"
            width={180}
            height={60}
            alt="Healthwell logo"
            priority
          />
        </div>

        {/* Menu desktop */}
        <div className="hidden md:flex gap-10 items-center">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={handleScroll(item.id)}
              className={`transition-colors duration-300 text-white hover:text-yellow-300`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Button desktop */}
        <div className="hidden md:flex gap-8 items-center">
          <Link
            href="/auth?mode=signup"
            className="transition-colors duration-300 hover:text-yellow-300"
          >
            Sign Up
          </Link>
          <Link
            href="/auth?mode=login"
            className="bg-yellow text-black px-5 py-2 rounded-3xl hover:bg-green-100 transition-all duration-300 ease-out hover:text-gray-700"
          >
            Login
          </Link>
        </div>

        {/* Hamburger (mobile only) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 bg-black bg-opacity-80 backdrop-blur-md rounded-lg py-4 px-6 flex flex-col gap-4 text-center text-white text-base">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={handleScroll(item.id)}
              className={`transition-colors duration-300 ${
                active === item.id ? "text-yellow-300" : "text-white"
              } hover:text-yellow-300`}
            >
              {item.label}
            </a>
          ))}

          <div className="flex flex-col gap-3 mt-4">
            <Link
              href="/auth?mode=signup"
              onClick={() => setMenuOpen(false)}
              className="transition-colors duration-300 hover:text-yellow-300"
            >
              Sign Up
            </Link>
            <Link
              href="/auth?mode=login"
              onClick={() => setMenuOpen(false)}
              className="bg-yellow text-black py-2 rounded-3xl hover:bg-green-100 transition-all duration-300 ease-out hover:text-gray-700"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
