import React from "react";
import PasswordInput from "./PasswordInput";

export default function PasswordForm() {
    return (
        <form className="space-y-6">
            <PasswordInput label="Password" showForgot />
            <PasswordInput label="New Password" />
            <PasswordInput label="Confirm New Password" />

            <button
                type="submit"
                className="w-full md:w-auto bg-[#0A3917] text-white px-7 py-3 rounded-full hover:bg-green-900 transition text-ls"
            >
                Update Password
            </button>
        </form>
    );
}