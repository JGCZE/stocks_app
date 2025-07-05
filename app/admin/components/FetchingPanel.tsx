"use client";

import { Button } from "@/components/ui/button";
import { ERoutes } from "@/lib/enums";
import Link from "next/link";
import { useEffect, useState } from "react";
import JSONOverview from "./JSONOverview";
import { TCompleteStocksData } from "@/lib/types";
import { IoIosArrowDown } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import clsx from "clsx";

const FetchingPanel = ({ batchNumber }: { batchNumber: number }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchedData, setFetchedData] = useState<TCompleteStocksData>();
  const [fetchedCount, setFetchedCount] = useState(0);
  const [symbols, setSymbols] = useState<Array<string>>([]);
  const [showJSON, setShowJSON] = useState<boolean>(false);

  const handleFetch = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${ERoutes.FINANCIAL_DATA}?id=${batchNumber}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch stock data");
      }

      const data = await response.json();

      if (!data.response) {
        throw new Error("No data received");
      }

      console.log(`Fetched batch ${batchNumber} data:`, data.response);
      setFetchedData(data.response);
    } catch (error) {
      console.error("Error fetching stock data:", error);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fetchedData) {
      const symbols = Object.keys(fetchedData);
      setSymbols(symbols);
      setFetchedCount(symbols.length);
    }
  }, [fetchedData]);

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Link href="/admin" className="text-blue-600 hover:underline">
          ← Back to batch selection
        </Link>
      </div>

      {/* toto bude komponenta TODO */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900">
          Batch {batchNumber} Information
        </h3>
        <p className="text-blue-700">
          This batch contains stocks {(batchNumber - 1) * 100 + 1} to{" "}
          {batchNumber * 100}
        </p>
        <p className="text-sm text-blue-600 mt-1">
          Each fetch will consume ~200 API calls (2 per stock)
        </p>
      </div>

      <Button
        onClick={handleFetch}
        disabled={loading || !!fetchedCount}
        className={clsx(
          "bg-blue-500 hover:bg-blue-600",
          fetchedCount && "bg-red-600"
        )}
      >
        {loading ? "Fetching..." : `Fetch Batch ${batchNumber} Data`}
      </Button>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">Error: {error}</p>
        </div>
      )}

      {fetchedData && !loading && (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-700 font-semibold flex gap-2 items-center">
              <FaCheck /> Successfully fetched {fetchedCount} stocks
            </p>
          </div>

          <div className="flex gap-4">
            <Button variant="outline">Save to Database</Button>

            <Button variant="outline">
              Download as JSON {/* TODO? má to vůbec smysl */}
            </Button>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Ticker symbols Preview:</h3>
            <div className="grid grid-cols-10">
              {symbols && symbols.map((symbol) => <p key={symbol}>{symbol}</p>)}
            </div>
          </div>

          <Button onClick={() => setShowJSON(!showJSON)}>
            {showJSON ? "Hide JSON" : "Show entire JSON"} <IoIosArrowDown />
          </Button>
          {showJSON && <JSONOverview fetchedData={fetchedData} />}
        </div>
      )}
    </div>
  );
};

export default FetchingPanel;
