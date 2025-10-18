"use client";

import React, { useState } from "react";
import { Search, X } from "lucide-react";

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
          flex items-center gap-2 sm:gap-3 bg-zinc-100 px-3 sm:px-4 py-2 sm:py-3 rounded-full border-1 transition-all duration-200 
          ${
            isFocused
              ? "border-green-500 bg-white shadow-lg"
              : "hover:bg-zinc-200"
          }
          w-full sm:min-w-[280px] md:min-w-[400px]
        `}
      >
        <Search className="text-zinc-600 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />

        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-gray-700 placeholder-zinc-500 text-xs sm:text-sm min-w-0"
        />

        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="text-zinc-500 hover:text-zinc-700 transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;