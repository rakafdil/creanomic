"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 sm:gap-10 lg:gap-14 text-white font-semibold rounded-2xl bg-[#0A3917] overflow-hidden min-h-[300px] sm:min-h-[380px] lg:min-h-[441px]">
      {/* Left Content */}
      <motion.div
        className="flex flex-col gap-4 sm:gap-6 lg:gap-7 px-6 sm:px-10 lg:pl-16 py-8 sm:py-14 lg:py-20"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          type: "spring",
          bounce: 0.4,
          duration: 0.8,
          delay: 0.2,
        }}
      >
        <motion.div
          className="flex flex-col gap-2 sm:gap-2.5 lg:gap-3"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            bounce: 0.3,
            duration: 0.8,
            delay: 0.4,
          }}
        >
          <motion.span
            className="text-lg sm:text-2xl lg:text-3xl font-medium"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              bounce: 0.5,
              duration: 0.6,
              delay: 0.6,
            }}
          >
            100% Healthy And Affordable
          </motion.span>

          <motion.span
            className="text-3xl sm:text-4xl lg:text-6xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              bounce: 0.4,
              duration: 0.8,
              delay: 0.8,
            }}
          >
            Organic <span className="text-[#D0F348]">products</span>
          </motion.span>

          <motion.span
            className="text-lg sm:text-2xl lg:text-3xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              bounce: 0.3,
              duration: 0.6,
              delay: 1.0,
            }}
          >
            Small Change Big Difference
          </motion.span>
        </motion.div>

        <motion.div
          className="font-bold"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            bounce: 0.6,
            duration: 0.8,
            delay: 1.2,
          }}
        >
          <Link href="/products#product">
            <motion.button
              className="bg-[#D0F348] text-black text-lg sm:text-2xl lg:text-3xl px-4 sm:px-5 py-3 sm:py-3.5 lg:py-4 rounded-lg cursor-pointer"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(208, 243, 72, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.3 }}
            >
              SHOP NOW
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Right Content */}
      <div className="flex-1 relative flex items-center justify-center pb-6 lg:pb-0">
        {/* Background pattern */}
        <motion.div
          className="absolute inset-0 z-0 left-0 sm:left-40 lg:left-80"
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 1.5,
            delay: 0.3,
          }}
        >
          <Image
            src="/assets/bg-hero-product.png"
            alt="bg doodles"
            width={500}
            height={500}
            className="object-cover w-full h-full opacity-80"
          />
        </motion.div>

        {/* White circle and man image */}
        <div className="relative z-10 flex items-center justify-center lg:justify-start lg:top-6">
          <motion.div
            className="absolute w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-white rounded-full sm:top-10 lg:top-20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              bounce: 0.8,
              duration: 1.2,
              delay: 0.5,
            }}
          />

          <motion.div
            initial={{
              scale: 0,
              rotate: -180,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              rotate: 0,
              opacity: 1,
            }}
            transition={{
              type: "spring",
              bounce: 0.6,
              duration: 1.5,
              delay: 0.8,
            }}
          >
            <Image
              src="/assets/hero-product-man.svg"
              alt="man with vegetables"
              width={350}
              height={350}
              className="object-contain relative z-20 w-44 h-44 sm:w-64 sm:h-64 lg:w-[350px] lg:h-[350px]"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;