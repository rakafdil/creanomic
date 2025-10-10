import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-row gap-14 text-white font-semibold rounded-2xl bg-[#0A3917] overflow-hidden min-h-[441px]">
      <div className="flex flex-col gap-7 pl-16 py-20">
        <div className="flex flex-col gap-3">
          <span className="text-3xl font-medium">
            100% Healthy And Affordable
          </span>
          <span className="text-6xl">
            Organic <span className="text-[#D0F348]">products</span>
          </span>
          <span className="text-3xl">Small Change Big Difference</span>
        </div>
        <div className="font-bold">
          <button className="bg-[#D0F348] text-black text-3xl px-5 py-4 rounded-lg">
            SHOP NOW
          </button>
        </div>
      </div>

      <div className="flex-1 relative flex items-center justify-center">
        {/* Background pattern */}
        <div className="absolute inset-0 z-0 left-80">
          <Image
            src="/assets/bg-hero-product.png"
            alt="bg doodles"
            width={500}
            height={500}
            className="object-cover w-full h-full opacity-80"
          />
        </div>

        {/* White circle and man image */}
        <div className="relative z-10 flex items-center justify-center top-15">
          <div className="absolute w-96 h-96 bg-white rounded-full top-20"></div>
          <Image
            src="/assets/hero-product-man.svg"
            alt="man with vegetables"
            width={350}
            height={350}
            className="object-contain relative z-20 bottom-10"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
