"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TabsHeader from "./TabsHeader";
import DescriptionTab from "./DescriptionTab";
import AdditionalInfoTab from "./AdditionalInfoTab";
import ReviewTab from "./ReviewTab";

const tabVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState<"description" | "info" | "review">(
    "description"
  );

  return (
    <section className="w-full mx-auto py-6">
      {/* Header Tabs */}
      <TabsHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content */}
      <div className="mt-6 min-h-[200px]">
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
              <ReviewTab />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProductTabs;
