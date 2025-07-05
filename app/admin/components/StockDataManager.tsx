import Link from "next/link";

const BATCHES = [
  { id: 1, name: "Batch 1", range: "1-100" },
  { id: 2, name: "Batch 2", range: "101-200" },
  { id: 3, name: "Batch 3", range: "201-300" },
  { id: 4, name: "Batch 4", range: "301-400" },
  { id: 5, name: "Batch 5", range: "401-500" },
  { id: 6, name: "Batch 6", range: "501-503" },
];

export const StockDataManager = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Select Stock Batch to Process</h1>

      <div className="grid grid-cols-3 gap-4">
        {BATCHES.map((batch) => (
          <Link
            key={batch.id}
            href={`/admin/${batch.id}`}
            className="block p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all"
          >
            <h3 className="text-lg font-semibold">{batch.name}</h3>
            <p className="text-gray-600">Stocks {batch.range}</p>
            <p className="text-sm text-blue-600 mt-2">Click to process →</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
