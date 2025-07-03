"use server";

import financialMerging from "@/lib/resolvers/financials/financialsMerging";
import resolveAllFinancials from "@/lib/resolvers/financials/resolveAllFinancials";
import resolveGlobalStockData from "@/lib/resolvers/financials/resolveGlobalStockData";

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
    url.searchParams.append("apikey", API_KEY);

    const response = await fetch(url.toString(), {
      next: { revalidate: 24 * 3600 },
    }); // 1 day

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `API request failed for ${url}. Status: ${response.status}. Body: ${errorBody}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return undefined;
  }
};

export type TFinancialsData = {
  symbol: string;
  date: string;
  freeCashFlow: number;
  capitalExpenditure: number;
  netChangeInCash: number;
  netDividendsPaid: number;
  revenue: number;
  costOfRevenue: number;
  grossProfit: number;
  ebitda: number;
  netIncome: number;
  eps: number;
};

const getSingleStockData = async (
  symbol: string
): Promise<Array<TFinancialsData>> => {
  const [fetchedCFStatement, fetchedIncomeStatement] = await Promise.all([
    fetchFMP(symbol, "cash-flow-statement"),
    fetchFMP(symbol, "income-statement"),
    // TEMPORARY DISABLED BECAUSE OF API CHANGES FROM THEIR SIDE
    //fetchFMP(symbol, "key-metrics"),
  ]);

  if (!fetchedCFStatement || !fetchedIncomeStatement) {
    throw new Error("Failed to fetch one or more statements");
  }

  const resolvedFinancials = resolveAllFinancials(
    fetchedCFStatement,
    fetchedIncomeStatement
  );

  const financialsData = financialMerging(resolvedFinancials);
  //console.log(`Merged financials data for >>>`, financialsData);

  return financialsData;
};

export const getGlobalStockData = async () => {
  try {
    const symbols = ["AAPL", "MSFT"];

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

    return resolveGlobalStockData(results);
  } catch (error) {
    console.error("Error fetching and saving stock data:", error);
    return undefined;
  }
};
