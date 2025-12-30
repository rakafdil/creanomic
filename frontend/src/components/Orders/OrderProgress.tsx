"use client";
import { useState } from "react";
import { ClipboardList, ClipboardCheck, Package, Truck, Check } from "lucide-react";

const steps = [
    { id: 1, title: "Order Placed", icon: ClipboardList },
    { id: 2, title: "Accepted", icon: ClipboardCheck },
    { id: 3, title: "In progress", icon: Package },
    { id: 4, title: "On the way", icon: Truck },
    { id: 5, title: "Delivered", icon: Check },
];

export default function OrderProgress() {
    const [currentStep, setCurrentStep] = useState(2);

    return (
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto mt-8 sm:mt-12 lg:mt-15 select-none px-2 sm:px-4">
            {/* Icons + Titles */}
            <div className="flex justify-between w-full">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isCompleted = index + 1 < currentStep;
                    const isActive = index + 1 === currentStep;

                    return (
                        <div
                            key={step.id}
                            className="flex flex-col items-center text-center cursor-pointer transition-transform hover:scale-105"
                            onClick={() => setCurrentStep(index + 1)}
                        >
                            <Icon
                                size={32}
                                className={`sm:w-10 sm:h-10 lg:w-[50px] lg:h-[50px] mb-1 sm:mb-2 transition-colors duration-300 ${
                                    isCompleted || isActive ? "text-green-900" : "text-gray-400"
                                }`}
                            />
                            <p
                                className={`text-xs sm:text-sm lg:text-lg font-medium transition-colors duration-300 ${
                                    isCompleted || isActive ? "text-black" : "text-gray-500"
                                }`}
                            >
                                {step.title}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Progress Line + Checkboxes */}
            <div className="relative w-full mt-6 sm:mt-8 lg:mt-10 flex justify-between items-center">
                {/* Background line */}
                <div className="absolute left-0 w-full h-[3px] sm:h-[4px] bg-gray-300 rounded-full z-0"></div>

                {/* Active line */}
                <div
                    className="absolute left-0 h-[6px] sm:h-[8px] lg:h-[10px] bg-green-900 rounded-full z-10 transition-all duration-700 ease-in-out"
                    style={{
                        width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                    }}
                ></div>

                {/* Checkboxes */}
                {steps.map((step, index) => {
                    const isCompleted = index + 1 <= currentStep;

                    return (
                        <div
                            key={step.id}
                            onClick={() => setCurrentStep(index + 1)}
                            className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-[3px] sm:rounded-[4px] border cursor-pointer z-20 transition-all duration-300 ${
                                isCompleted
                                    ? "bg-green-900 border-green-900 text-white hover:bg-green-800"
                                    : "bg-gray-300 border-gray-300 text-gray-500 hover:bg-gray-400"
                            }`}
                        >
                            <Check size={18} className="sm:w-5 sm:h-5 lg:w-[25px] lg:h-[25px]" />
                        </div>
                    );
                })}
            </div>

            {/* Dates */}
            <div className="flex justify-between w-full mt-1.5 sm:mt-2">
                {steps.map((step) => (
                    <p key={step.id} className="text-[10px] sm:text-xs lg:text-base text-gray-500 font-medium">
                        18 Okt 2025
                    </p>
                ))}
            </div>
        </div>
    );
}