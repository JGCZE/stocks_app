"use client"
import { Button } from '@/components/ui/button'
import { ERoutes } from '@/lib/enums'
import React, { useState } from 'react'


export const StockDataManager = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchedData, setFetchedData] = useState(null);

  const handleFetch = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(ERoutes.FINANCIAL_DATA, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch stock data');
      }

      const data = await response.json();

      const { response: fetchedData } = data

      if (!fetchedData) {
        throw new Error('No data received');
      }

      console.log("Fetched stock data:", fetchedData);
      setFetchedData(fetchedData);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  }

  console.log("Fetched Data:", fetchedData);
  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div className="flex gap-4">
        <Button
          onClick={handleFetch}
          disabled={loading}
        >
          {loading ? "Fetching..." : "Fetch Stock Data"}
        </Button>
      </div>

      {fetchedData && (
        <div>
          <h2 className="text-lg font-semibold">Fetched Stock Data</h2>
          <pre className="bg-gray-100 p-4 rounded-lg">
            {JSON.stringify(Object.keys(fetchedData), null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
