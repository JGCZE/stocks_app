"use server"

import { resolveKeyMetrics } from "@/lib/resolvers/resolveKeyMetrics";

const BASE_ENDPOINT = process.env.FGP_ENDPOINT;

const fetchFMP = async (symbol: string, statement: string) => {
  try {
    const URL = `${BASE_ENDPOINT}/${statement}/${symbol}?period=annual&apikey=${process.env.FGP_API_KEY}`;
    
    const response = await fetch(URL, { next: { revalidate: 24 * 3600 } }); // 1 day
    
    if (!response.ok) {
      throw new Error("Fetch doesnt work");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const getCFStatement = async (symbol: string) => {
  const fetchedData = await fetchFMP(symbol, "cash-flow-statement");

  if (!fetchedData) {
    throw new Error("Failed to fetch cash flow statement");
  }
  return fetchedData; // todo resolver
};

const getIncomeStatement = async (symbol: string) => {
  const fetchedData = await fetchFMP(symbol, "income-statement");

  if (!fetchedData) {
    throw new Error("Failed to fetch income statement");
  }

  return fetchedData; // todo resolver
}

const getKeyMetrics = async (symbol: string) => {
  const fetchedData = await fetchFMP(symbol, "key-metrics");
  
  if (!fetchedData) {
    throw new Error("Failed to fetch key metrics");
  }
  
  const data = await fetchedData.json();
  return resolveKeyMetrics(data);
}

export const getAllStocksData = async (symbol: string) => {
  try {
    const [CFStatement, incomeStatement, keyMetrics] = await Promise.allSettled([
      getCFStatement(symbol),
      getIncomeStatement(symbol),
      getKeyMetrics(symbol),
    ]);

    

    console.log("CFStatement >>", CFStatement);
    console.log("incomeStatement >>", incomeStatement);
    console.log("keyMetrics >>", keyMetrics);
    // Check if the data is valid
    return {
      CFStatement,
      incomeStatement,
      keyMetrics,
    };
  } catch (error) {
    console.error("Error fetching all stocks data:", error);
    throw new Error("Failed to fetch all stocks data");
  }
}

export const getStockDataAndSave = async () => {
  try {
    const symbols = [ // TESTING
      "AAPL",
      "MSFT",
    ];

    const allStocksData = await Promise.allSettled(
      symbols.map(async (symbol) => getAllStocksData(symbol))
    );

    console.log("allStocksData >>>", allStocksData);
    return allStocksData;
  } catch (error) {
    console.error("Error fetching and saving stock data:", error);
  }
};
