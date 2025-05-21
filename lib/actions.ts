"use server";

import { ANNUAL_PERIOD, TOP_STOCKS_SYMBOLS } from "./constants";
import resolveFMP from "./resolvers/resolveFMP";
import resolveTopStocksFromYahoo from "./resolvers/resolveTopStocksFromYahoo";
import { TTopStocksYahoo } from "./types";

const YAHOO_ENDPOINT = "https://query2.finance.yahoo.com/v8/finance/chart";

export const getStockFromYahoo = async (symbol: string) => {
  try {
    const response = await fetch(`${YAHOO_ENDPOINT}/${symbol}`, {
      next: { revalidate: 144000 }, // cache for 4 hour
    });

    if (!response.ok) {
      throw new Error(
        `getStockFromYahoo Fetch doesnt work: ${response.status}`
      );
    }

    const {
      chart: { result },
    } = await response.json();

    const metaData = result[0].meta;

    const data: TTopStocksYahoo = {
      longName: metaData.longName,
      symbol: metaData.symbol,
      price: metaData.regularMarketPrice,
      dayLow: metaData.regularMarketDayLow,
      dayHigh: metaData.regularMarketDayHigh,
      ftwLow: metaData.fiftyTwoWeekLow,
      ftwHigh: metaData.fiftyTwoWeekHigh,
    };

    const test = resolveTopStocksFromYahoo(result);
    console.log("XXX >>", test);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const getTopStocksFromYahoo = async () => {
  try {
    const response = TOP_STOCKS_SYMBOLS.map((symbol) =>
      getStockFromYahoo(symbol)
    );

    const rawResults = await Promise.allSettled(response);

    const results = rawResults.filter((res) => res.status === `fulfilled`);

    return results.map((r) => r.value);
  } catch (error) {
    console.error("Error fetching top stocks: ", error);
    return null;
  }
};

export const getTopStockFromFMP = async (tickerSymbols: Array<string>) => {
  try {
    const ENDPOINT = process.env.FGP_ENDPOINT;
    const API_KEY = process.env.FGP_API_KEY;

    if (!ENDPOINT) {
      throw new Error("FGP ENDPOINT is not defined");
    }

    if (!API_KEY) {
      throw new Error("FGP API KEY is not defined");
    }

    const FMPTopStocks = await Promise.all(
      tickerSymbols.map(async (tickerSymbol) => {
        const url = `${ENDPOINT}/${tickerSymbol}?period=${ANNUAL_PERIOD}&apikey=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Fetch doesnt work");
        }

        const data = await response.json();
        const stocks = resolveFMP(data);

        return stocks;
      })
    );

    //console.log("result ––––>", FMPTopStocks);
    //const data = resolveFMP(FMPTopStocks);

    return FMPTopStocks;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
