"use server"

import resolveCFStatements from "@/lib/resolvers/financials/resolveCFStatements";
import resolveIncomeStatement from "@/lib/resolvers/financials/resolveIncomeStatements";
import { resolveKeyMetrics } from "@/lib/resolvers/financials/resolveKeyMetrics";

const BASE_ENDPOINT = process.env.FGP_ENDPOINT;
const API_KEY = process.env.FGP_API_KEY;

if (!BASE_ENDPOINT || !API_KEY) {
  throw new Error("Missing required environment variables FGP_ENDPOINT or FGP_API_KEY");
}


const fetchFMP = async (symbol: string, statement: string) => {
  try {
    const url = new URL(`${BASE_ENDPOINT}/${statement}/${symbol}`);
    url.searchParams.append('period', 'annual');
    url.searchParams.append('apikey', API_KEY);

    //`${BASE_ENDPOINT}/${statement}/${symbol}?period=annual&apikey=${process.env.FGP_API_KEY}`;

    const response = await fetch(url.toString(), { next: { revalidate: 24 * 3600 } }); // 1 day

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`API request failed for ${url}. Status: ${response.status}. Body: ${errorBody}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const getSingleStockData = async (symbol: string): TODOTYPES => {
  const [fetchedCFStatement, fetchedIncomeStatement, fetchedKeyMetrics] = await Promise.allSettled([
    fetchFMP(symbol, "cash-flow-statement"),
    fetchFMP(symbol, "income-statement"),
    fetchFMP(symbol, "key-metrics"),
  ]);

  if (fetchedCFStatement.status === "rejected" || fetchedIncomeStatement.status === "rejected" || fetchedKeyMetrics.status === "rejected") {
    throw new Error("Failed to fetch one or more statements");
  }

  const keyMetrics = resolveKeyMetrics(fetchedKeyMetrics.value);
  const incomeStatement = resolveIncomeStatement(fetchedIncomeStatement);
  const CFStatement = resolveCFStatements(fetchedCFStatement);

  return {
    CFStatement,
    incomeStatement,
    keyMetrics,
  };
}

export const getStockDataAndSave = async () => {
  try {
    const symbols = [ // TESTING
      "AAPL",
      "MSFT",
    ];

    const allStocksDataPromise = symbols.map((symbol) => getSingleStockData(symbol));

    const results = await Promise.allSettled(allStocksDataPromise);

   /*  const allStocksData = await Promise.allSettled(
      symbols.map(async (symbol) => getSingleStockData(symbol))
    ); */

    //console.log("allStocksData >>>", allStocksData);
    //console.dir(allStocksData, { depth: null, colors: true });
    return results;
  } catch (error) {
    console.error("Error fetching and saving stock data:", error);
  }
};
