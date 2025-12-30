import Image from "next/image";
import React from "react";

interface LogoProps {
  width: number;
  height: number;
  className?: string;
}

const Logo = ({ width, height, className = "" }: LogoProps) => {
  return (
    <span className={`flex items-center gap-2 justify-center ${className}`}>
      <Image
        src="/assets/logo_icon.svg"
        alt="GrowthWell logo"
        width={width}
        height={height}
        priority
      />
      <span className="text-[#74AB35] text-2xl font-semibold">GrowthWell</span>
    </span>
  );
};

export default Logo;
