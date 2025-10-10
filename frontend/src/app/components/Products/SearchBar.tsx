"use client";

import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

interface SearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

const SearchBar = ({
  placeholder = "Search your product, categories or brands",
  onSearch,
  className = "",
}: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };

  const handleClear = () => {
    setSearchQuery("");
    onSearch?.("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div
        className={`
          flex items-center gap-3 bg-zinc-100 px-4 py-3 rounded-full border-1 transition-all duration-200 
          ${
            isFocused
              ? "border-green-500 bg-white shadow-lg"
              : " hover:bg-zinc-200"
          }
          min-w-[300px] md:min-w-[400px]
        `}
      >
        <CiSearch className="text-zinc-600 text-xl flex-shrink-0" />

        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-gray-700 placeholder-zinc-500 text-sm"
        />

        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="text-zinc-500 hover:text-zinc-700 transition-colors"
          >
            <IoClose className="text-lg" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
