"use client";
import React, { useState } from "react";
import TabsHeader from "./TabsHeader";
import DescriptionTab from "./DescriptionTab";
import AdditionalInfoTab from "./AdditionalInfoTab";
import ReviewTab from "./ReviewTab";

const ProductTabs = () => {
    const [activeTab, setActiveTab] = useState<"description" | "info" | "review">("description");

    return (
        <section className="w-full max-w-5xl mx-auto py-10 px-4">
            {/* Header Tabs */}
            <TabsHeader activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Content */}
            <div className="mt-6">
                {activeTab === "description" && <DescriptionTab />}
                {activeTab === "info" && <AdditionalInfoTab />}
                {activeTab === "review" && <ReviewTab />}
            </div>
        </section>
    );
};

export default ProductTabs;