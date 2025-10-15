"use client";

import React from "react";
import { motion } from "framer-motion";

const CheckmarkIcon = () => (
  <motion.svg
    initial={{ scale: 0, rotate: -90 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ type: "spring", stiffness: 400, damping: 20, duration: 0.8 }}
    className="w-24 h-24 text-white bg-[#0A3917] rounded-full p-3 shadow-lg"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="5"
      d="M5 13l4 4L19 7"
    />
  </motion.svg>
);

const OrderConfirmationStatus = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex flex-col items-center text-center mt-14 mb-12"
    >
      <CheckmarkIcon />
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="text-2xl font-semibold mt-4"
      >
        Your Order is completed!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="text-gray-600 mt-1"
      >
        Thank you. Your order has been received
      </motion.p>
    </motion.div>
  );
};

export default OrderConfirmationStatus;
