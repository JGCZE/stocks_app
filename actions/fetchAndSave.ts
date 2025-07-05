"use server";

import { connectDB } from "@/lib/dbConnection";
import { StockModel } from "@/lib/models/StockSchema";
import financialMerging from "@/lib/resolvers/financials/financialsMerging";
import resolveAllFinancials from "@/lib/resolvers/financials/resolveAllFinancials";
import resolveGlobalStockData from "@/lib/resolvers/financials/resolveGlobalStockData";
import { TFinancialsData } from "@/lib/types";

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

const getSingleStockData = async (
  symbol: string
): Promise<Array<TFinancialsData>> => {
  const [fetchedCFStatement, fetchedIncomeStatement] = await Promise.all([
    fetchFMP(symbol, "cash-flow-statement"),
    fetchFMP(symbol, "income-statement"),
  ]);

  if (!fetchedCFStatement || !fetchedIncomeStatement) {
    throw new Error("Failed to fetch one or more statements");
  }

  const resolvedFinancials = resolveAllFinancials(
    fetchedCFStatement,
    fetchedIncomeStatement
  );

  const financialsData = financialMerging(resolvedFinancials);

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

const testData = [
  {
    companySymbol: "AAPL",
    data: [
      {
        symbol: "AAPL",
        date: "2023-09-30",
        revenue: 123456789,
        ebitda: 98765432,
      },
      {
        symbol: "AAPL",
        date: "2023-06-30",
        revenue: 112233445,
        ebitda: 55667788,
      },
    ],
  },
  {
    companySymbol: "MSFT",
    data: [
      {
        symbol: "MSFT",
        date: "2023-09-30",
        revenue: 123456789,
        ebitda: 98765432,
      },
      {
        symbol: "MSFT",
        date: "2023-06-30",
        revenue: 112233445,
        ebitda: 55667788,
      },
    ],
  },
];

export const saveStocksToDB = async () => {
  try {
    await connectDB();

    const bulkOprations = testData.map((stock) => ({
      updateOne: {
        filter: { companySymbol: stock.companySymbol },
        update: { $set: stock },
        upsert: true,
      },
    }));

    const response = await StockModel.bulkWrite(bulkOprations);
    /* wtf bulkWrite - celkem gamechanger */
    /* todo - vrací to dobrý data z databáze, co se změnilo, kolik bylo shod apod. dalo by se pěkně využít */
    /* musím ještě přeformátovat data :(((((  */

    console.log("Response from DB:", response);

    if (!response) {
      throw new Error("Failed to save stock data to the database");
    }
  } catch (error) {
    console.error("Error saving stock data to DB:", error);
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
};
