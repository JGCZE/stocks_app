"use client"

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { SAPData } from "@/lib/S&P500_symbols";
import { TSAPData } from "@/lib/types";

const NavSearch = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [data, setData] = useState<TSAPData>(SAPData);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (query: string) => {
    if (query.length > 0) {
      // Perform search logic here
      console.log("Searching for:", query);
    } else {
      // Reset or clear search results
      console.log("Search cleared");
    }
  };

  return (
    <div className="w-full flex items-center justify-center relative">
      <Input
        type="search"
        placeholder="Hledej..."
        className="bg-white rounded-xl h-10"
        onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setIsOpen(false);
          }
        }}
        autoComplete="off"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />

      {isOpen && (
        <div className="absolute top-12 left-0 w-96 bg-white shadow-lg rounded-lg p-4">
          <ul>
            <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Option 1</li>
            <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Option 2</li>
            <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Option 3</li>
          </ul>
        </div>
      )
      }
    </div>
  );
};

export default NavSearch;
