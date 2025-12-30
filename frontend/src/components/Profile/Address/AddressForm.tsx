import React from "react";
import InputField from "./InputField";

export default function AddressForm() {
    return (
        <div className="mt-6">
            <h3 className="text-lg md:text-xl font-semibold mb-4">Add New Address</h3>

            <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="First Name" placeholder="Ex. John" />
                    <InputField label="Last Name" placeholder="Ex. John" />
                </div>

                <InputField label="Company Name" placeholder="Contoh : TECHHH" optional />
                <InputField label="Street Address" placeholder="Contoh : Jl Veteran" />
                <InputField label="City" placeholder="Contoh : Kota Malang" />
                <InputField label="State" placeholder="Contoh : Blabla" />
                <InputField label="Zip Code" placeholder="Contoh : 11243" />
                <InputField label="Phone" placeholder="Contoh : 823141764149174" type="tel" />

                <button
                    type="submit"
                    className="w-full md:w-auto bg-[#0A3917] text-white px-4 py-2 rounded-md hover:bg-green-900"
                >
                    Add Address
                </button>
            </form>
        </div>
    );
}