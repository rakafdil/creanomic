"use client";
import Image from "next/image";
import Hero from "@/components/Home/Hero";
import AboutUs from "@/components/Home/AboutUs";
import Services from "@/components/Home/Services";
import FreqAskQuestions from "@/components/Home/FreqAskQuestions";
import Navbar from "@/components/Common/Navbar";
import ToTop from "@/components/Common/ToTop";
import Footer from "@/components/Common/Footer";
import GIS from "@/components/Home/GIS";
import React, { useEffect, useState } from "react";
export default function Home() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    setToken(t);
    console.log(t);
  }, []);
  return (
    <div className="font-inter">
      <Navbar />

      <div id="home">
        <Hero />
      </div>
      <div id="gis">
        <GIS />
      </div>
      <div id="about-us" className="px-6 sm:px-12 md:px-24 lg:px-36">
        <AboutUs />
      </div>

      <div id="services">
        <Services />
      </div>

      <div id="contacts" className="px-6 sm:px-12 md:px-24 lg:px-36">
        <FreqAskQuestions />
      </div>

      <ToTop />
    </div>
  );
}
