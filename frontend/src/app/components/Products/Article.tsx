"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Article = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 }); // aktif pas 30% elemen keliatan

  return (
    <div
      ref={ref}
      className="flex flex-row gap-14 text-white font-semibold rounded-2xl bg-[#0A3917] overflow-hidden min-h-[308px]"
    >
      {/* Left Content - Image */}
      <div className="flex-1 relative flex items-center justify-end">
        {/* Background pattern */}
        <motion.div
          className="absolute inset-0 z-0 right-40"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 0.8, x: 0 } : {}}
          transition={{
            type: "spring",
            bounce: 0.3,
            duration: 1.2,
            delay: 0.2,
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

        {/* White circle and farmer image */}
        <div className="relative z-10 flex items-center justify-center top-10">
          <motion.div
            className="absolute w-80 h-80 bg-white rounded-full blur-3xl top-20"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 0.4 } : {}}
            transition={{
              type: "spring",
              bounce: 0.6,
              duration: 1.0,
              delay: 0.4,
            }}
          />

          <motion.div
            initial={{ x: -100, opacity: 0, rotate: -10 }}
            animate={isInView ? { x: 0, opacity: 1, rotate: 0 } : {}}
            transition={{
              type: "spring",
              bounce: 0.5,
              duration: 1.2,
              delay: 0.6,
            }}
          >
            <Image
              src="/assets/farmer-read.svg"
              alt="farmer reading"
              width={320}
              height={320}
              className="object-contain relative z-20"
            />
          </motion.div>
        </div>
      </div>

      {/* Right Content - Text */}
      <motion.div
        className="flex-1 flex flex-col gap-7 py-8 pr-16"
        initial={{ x: 100, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{
          type: "spring",
          bounce: 0.4,
          duration: 0.8,
          delay: 0.3,
        }}
      >
        <motion.div
          className="flex flex-col gap-6"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{
            type: "spring",
            bounce: 0.3,
            duration: 0.8,
            delay: 0.5,
          }}
        >
          <motion.h2
            className="text-white text-4xl font-semibold leading-tight"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{
              type: "spring",
              bounce: 0.4,
              duration: 0.6,
              delay: 0.7,
            }}
          >
            Kenali Lebih Dalam Manfaat{" "}
            <span className="text-[#D0F348]">Makanan Segar</span> untuk Hidup
            Sehat
          </motion.h2>

          <motion.p
            className="text-zinc-300 text-lg font-medium leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              type: "spring",
              bounce: 0.3,
              duration: 0.6,
              delay: 0.9,
            }}
          >
            Temukan beragam informasi menarik seputar buah, sayur, daging, dan
            rempah alami yang penuh nutrisi. Jelajahi cara menjaga pola makan
            seimbang untuk tubuh yang sehat dan bertenaga setiap hari.
          </motion.p>
        </motion.div>

        <motion.div
          className="font-semibold"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{
            type: "spring",
            bounce: 0.6,
            duration: 0.8,
            delay: 1.1,
          }}
        >
          <motion.button
            className="bg-white text-black text-2xl font-bold px-8 py-4 rounded-lg shadow-lg cursor-pointer"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 15px 35px rgba(255, 255, 255, 0.3)",
              y: -2,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", bounce: 0.4 }}
          >
            Explore Articles
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Article;
