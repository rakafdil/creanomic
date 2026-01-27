"use client";

import Hero from "@/components/Home/Hero";
import AboutUs from "@/components/Home/AboutUs";
import Services from "@/components/Home/Services";
import FreqAskQuestions from "@/components/Home/FreqAskQuestions";
import Navbar from "@/components/Common/Navbar";
import ToTop from "@/components/Common/ToTop";
import GIS from "@/components/Home/GIS";
import React from "react";

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api-growthwell.vercel.app/api/v1/"
    : "http://localhost:5050/api/v1/";

export default function Home() {
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
