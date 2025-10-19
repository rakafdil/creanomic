import React from "react";

interface AddressCardProps {
    name: string;
    address: string;
}

export default function AddressCard({ name, address }: AddressCardProps) {
    return (
        <div className="border rounded-md p-4 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h2 className="font-bold text-xl md:text-2xl">{name}</h2>
                <p className="text-sm font-bold text-[#595959]">{address}</p>
            </div>
            <div className="flex gap-4">
                <button className="text-[#3F9241] font-medium hover:underline">Edit</button>
                <button className="text-[#F44336] font-medium hover:underline">Delete</button>
            </div>
        </div>
    );
}