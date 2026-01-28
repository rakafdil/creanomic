"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TabsHeader from "./TabsHeader";
import DescriptionTab from "./DescriptionTab";
import AdditionalInfoTab from "./AdditionalInfoTab";
import ReviewTab from "./ReviewTab";
import { ProductItem } from "@/services/product.service";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/app/page";

const tabVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export interface ReviewPayload {
  rating: number;
  comment?: string;
}

const ProductTabs = ({ product }: { product?: ProductItem }) => {
  const [activeTab, setActiveTab] = useState<"description" | "info" | "review">(
    "description",
  );

  const insertReview = useMutation({
    mutationFn: async (data: ReviewPayload) => {
      const res = await axios.post(
        `${BASE_URL}reviews/${product?.id}`,
        { rating: data.rating, comment: data.comment },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      return res.data;
    },
  });

  return (
    <section className="w-full mx-auto py-4 md:py-6 px-4 sm:px-6 md:px-0">
      <TabsHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="mt-4 md:mt-6 min-h-[200px]">
        <AnimatePresence mode="wait">
          {activeTab === "description" && (
            <motion.div
              key="description"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <DescriptionTab />
            </motion.div>
          )}
          {activeTab === "info" && (
            <motion.div
              key="info"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <AdditionalInfoTab />
            </motion.div>
          )}
          {activeTab === "review" && (
            <motion.div
              key="review"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <ReviewTab
                add_review={insertReview}
                reviews={product?.reviews}
                review_sum={product?.review_summary}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProductTabs;
