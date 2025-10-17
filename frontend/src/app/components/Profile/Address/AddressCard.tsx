import React from "react";

interface AddressCardProps {
    name: string;
    address: string;
}

export default function AddressCard({ name, address }: AddressCardProps) {
    return (
        <div className="border rounded-md p-4 shadow-sm flex justify-between items-center">
            <div>
                <h2 className="font-semibold text-lg">{name}</h2>
                <p className="text-sm text-[#595959]">{address}</p>
            </div>
            <div className="flex gap-4">
                <button className="text-[#3F9241] font-medium hover:underline">Edit</button>
                <button className="text-[#F44336] font-medium hover:underline">Delete</button>
            </div>
        </div>
    );
}