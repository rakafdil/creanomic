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
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto mt-15 select-none">
            {/* Bagian ikon + judul */}
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
                                size={50}
                                className={`mb-2 transition-colors duration-300 ${isCompleted || isActive ? "text-green-900" : "text-gray-400"
                                    }`}
                            />
                            <p
                                className={`text-lg font-medium transition-colors duration-300 ${isCompleted || isActive ? "text-black" : "text-gray-500"
                                    }`}
                            >
                                {step.title}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Garis progres + kotak checklist */}
            <div className="relative w-full mt-10 flex justify-between items-center">
                {/* Garis background */}
                <div className="absolute left-0 w-full h-[4px] bg-gray-300 rounded-full z-0"></div>

                {/* Garis aktif */}
                <div
                    className="absolute left-0 h-[10px] bg-green-900 rounded-full z-10 transition-all duration-700 ease-in-out"
                    style={{
                        width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                    }}
                ></div>

                {/* Kotak checklist */}
                {steps.map((step, index) => {
                    const isCompleted = index + 1 <= currentStep;

                    return (
                        <div
                            key={step.id}
                            onClick={() => setCurrentStep(index + 1)}
                            className={`flex items-center justify-center w-10 h-10 rounded-[4px] border cursor-pointer z-20 transition-all duration-300 ${isCompleted
                                    ? "bg-green-900 border-green-900 text-white hover:bg-green-800"
                                    : "bg-gray-300 border-gray-300 text-gray-500 hover:bg-gray-400"
                                }`}
                        >
                            <Check size={25} />
                        </div>
                    );
                })}
            </div>

            {/* Tanggal di bawah */}
            <div className="flex justify-between w-full mt-2">
                {steps.map((step) => (
                    <p key={step.id} className="text-lx text-gray-500 font-medium">
                        18 Okt 2025
                    </p>
                ))}
            </div>
        </div>
    );
}