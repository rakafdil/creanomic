import React from "react";
import Footer from "../../components/Common/Footer";

export default function ProductsPage() {
    return (
        <div className="flex flex-col gap-8">
            <div className="w-full p-2.5 bg-gradient-to-r from-green-950 via-green-800 to-green-950 inline-flex justify-center items-center gap-2.5">
                <div className="text-center justify-start text-white text-sm font-bold font-['Inter']">
                    Welcome to GrowthWell
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}