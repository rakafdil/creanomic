import React from "react";

interface InputFieldProps {
    label: string;
    placeholder: string;
    optional?: boolean;
    type?: string;
}

export default function InputField({
    label,
    placeholder,
    optional,
    type = "text",
}: InputFieldProps) {
    return (
        <div className="flex flex-col space-y-1">
            <label className="text-lx font-semibold text-black">
                {label} {optional && <span className="text-[#595959]">(Optional)</span>}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            />
        </div>
    );
}
