"use server";

import resolveAllFinancials from "@/lib/resolvers/financials/resolveAllFinancials";

const BASE_ENDPOINT = process.env.FGP_ENDPOINT;
const API_KEY = process.env.FGP_API_KEY;

if (!BASE_ENDPOINT || !API_KEY) {
  throw new Error(
    "Missing required environment variables FGP_ENDPOINT or FGP_API_KEY"
  );
}

const fetchFMP = async (symbol: string, statement: string) => {
  try {
    const url = new URL(`${BASE_ENDPOINT}/${statement}?symbol=${symbol}`);
    //url.searchParams.append("period", "annual");
    url.searchParams.append("apikey", API_KEY);

    //const url = `${BASE_ENDPOINT}/${statement}?symbol=${symbol}&apikey=${process.env.FGP_API_KEY}`;

    const response = await fetch(url.toString(), {
      next: { revalidate: 24 * 3600 },
    }); // 1 day

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `API request failed for ${url}. Status: ${response.status}. Body: ${errorBody}`
      );
    }

    //const data = await response.json();
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return undefined;
  }
};

const getSingleStockData = async (symbol: string): TODOTYPES => {
  const [fetchedCFStatement, fetchedIncomeStatement, fetchedKeyMetrics] =
    await Promise.all([
      fetchFMP(symbol, "cash-flow-statement"),
      fetchFMP(symbol, "income-statement"),
      fetchFMP(symbol, "key-metrics"),
    ]);

  if (!fetchedCFStatement || !fetchedIncomeStatement || !fetchedKeyMetrics) {
    throw new Error("Failed to fetch one or more statements");
  }

  const resolvedFinancials = resolveAllFinancials(
    fetchedCFStatement,
    fetchedIncomeStatement,
    fetchedKeyMetrics
  );

  return {
    resolvedFinancials,
  };
};

export const getGlobalStockData = async () => {
  try {
    const symbols = [
      // TESTING
      "AAPL",
      "MSFT",
    ];

    const allStocksDataPromise = symbols.map((symbol) =>
      getSingleStockData(symbol)
    );

    if (allStocksDataPromise.length === 0) {
      throw new Error("No stock symbols provided");
    }

    const results = await Promise.all(allStocksDataPromise);

    if (!results) {
      throw new Error("No results returned from stock data fetch");
    }

    return results;
  } catch (error) {
    console.error("Error fetching and saving stock data:", error);
    return undefined;
  }
};
