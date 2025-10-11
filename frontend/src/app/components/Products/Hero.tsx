"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="flex flex-row gap-14 text-white font-semibold rounded-2xl bg-[#0A3917] overflow-hidden min-h-[441px]">
      {/* Left Content */}
      <motion.div
        className="flex flex-col gap-7 pl-16 py-20"
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
          className="flex flex-col gap-3"
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
            className="text-3xl font-medium"
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
            className="text-6xl"
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
            className="text-3xl"
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
              className="bg-[#D0F348] text-black text-3xl px-5 py-4 rounded-lg cursor-pointer"
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
      <div className="flex-1 relative flex items-center justify-center">
        {/* Background pattern */}
        <motion.div
          className="absolute inset-0 z-0 left-80"
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
        <div className="relative z-10 flex items-center justify-start top-6">
          <motion.div
            className="absolute w-96 h-96 bg-white rounded-full top-20"
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
              className="object-contain relative z-20"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
