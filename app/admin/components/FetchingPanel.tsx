"use client";

import { Button } from "@/components/ui/button";
import { ERoutes } from "@/lib/enums";
import Link from "next/link";
import { useState } from "react";

const FetchingPanel = ({ batchNumber }: { batchNumber: number}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchedData, setFetchedData] = useState<TODO>(null);
  const [fetchedCount, setFetchedCount] = useState(0);

  const handleFetch = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${ERoutes.FINANCIAL_DATA}?id=${batchNumber}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch stock data');
      }

      const data = await response.json();

      if (!data.response) {
        throw new Error('No data received');
      }

      console.log(`Fetched batch ${batchNumber} data:`, data.response);
      setFetchedData(data.response);
      setFetchedCount(data.response.length || 0);
      
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Link 
          href="/admin/stocks" 
          className="text-blue-600 hover:underline"
        >
          ← Back to batch selection
        </Link>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900">Batch {batchNumber} Information</h3>
        <p className="text-blue-700">
          This batch contains stocks {(batchNumber - 1) * 100 + 1} to {batchNumber * 100}
        </p>
        <p className="text-sm text-blue-600 mt-1">
          Each fetch will consume ~200 API calls (2 per stock)
        </p>
      </div>

      <div>
        <Button 
          onClick={handleFetch} 
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600"
        >
          {loading ? 'Fetching...' : `Fetch Batch ${batchNumber} Data`}
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">Error: {error}</p>
        </div>
      )}

      {fetchedData && !loading && (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-700 font-semibold">
              ✓ Successfully fetched {fetchedCount} stocks
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Data Preview:</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96 text-sm">
              {JSON.stringify(fetchedData, null, 2)}
            </pre>
          </div>

          <div className="flex gap-4">
            <Button variant="outline">
              Save to Database
            </Button>
            <Button variant="outline">
              Download as JSON {/* TODO? má to vůbec smysl */}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FetchingPanel;
