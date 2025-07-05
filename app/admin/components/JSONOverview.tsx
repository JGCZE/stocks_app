import { TCompleteStocksData } from "@/lib/types";
import React from "react";

interface IProps {
  fetchedData: TCompleteStocksData;
}

const JSONOverview = ({ fetchedData }: IProps) => (
  <div className="border rounded-lg p-4">
    <h3 className="font-semibold mb-2">JSON Preview:</h3>
    <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-screen text-sm">
      {JSON.stringify(fetchedData, null, 2)}
    </pre>
  </div>
);

export default JSONOverview;
