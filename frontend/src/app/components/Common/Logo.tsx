import Image from "next/image";
import React from "react";

const Logo = (width: number, height: number) => {
  return (
    <span className="flex items-center gap-2 justify-center mb-6">
      <Image
        src="/assets/logo_icon.svg"
        alt="GrowthWell logo"
        width={40}
        height={40}
        priority
      />
      <span className="text-[#74AB35] text-2xl font-semibold">GrowthWell</span>
    </span>
  );
};

export default Logo;
