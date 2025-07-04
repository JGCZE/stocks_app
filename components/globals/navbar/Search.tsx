"use client"

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { SAPData } from "@/public/StocksStaticData/S&P500_symbols";
import { TSAPData } from "@/lib/types";

const NavSearch = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [data,] = useState<TSAPData>(SAPData);
  const [searchResults, setSearchResults] = useState<TSAPData>([]);

  const handleSearch = (query: string) => {
    if (query.length > 0) {

      const searchedCompanies = data.filter((item) => (
        item.Symbol.toLowerCase().includes(query.toLowerCase()) ||
        item.Security.toLowerCase().includes(query.toLowerCase()
        ))
      )

      setSearchResults(searchedCompanies);
    } else {
      // Reset or clear search results
      console.log("Search cleared");
    }
  };

  return (
    <div className="w-full flex items-center justify-center relative">
      <Input
        type="search"
        placeholder="Srach by ticker symbol or company name ..."
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
        <div className="absolute top-12 left-0 min-w bg-white shadow-lg rounded-lg">
          <ul className="max-h-96 overflow-y-auto shadow-md shadow-gray-400">
            {searchResults.length > 0 ?
              searchResults.map((item, index) => (
                <div className="flex justify-between items-center space-y-2 gap-16 hover:bg-slate-200 px-4" key={index}>
                  <li>{item.Security}</li>
                  <li>{item.Symbol}</li>
                </div>
              ))
              :
              <p className="h-20 w-96 mt-12 px-10 font-semibold text-lg">no result</p>
            }
          </ul>
        </div>
      )
      }
    </div>
  );
};

export default NavSearch;
