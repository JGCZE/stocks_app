"use server";

import { ANNUAL_PERIOD } from "./constants";
import resolveFMP from "./resolvers/resolveFMP";
import resolveTopStocksFromYahoo from "./resolvers/resolveTopStocksFromYahoo";

const YAHOO_ENDPOINT = "https://query2.finance.yahoo.com/v8/finance/chart/meta";

export const getTopStockFromYahoo = async () => {
  try {
    //const response = await fetch(YAHOO_ENDPOINT);

    if (!response.ok) {
      throw new Error("Fetch doesnt work");
    }

    const data = await response.json();

    const Yahoo_topStocks = resolveTopStocksFromYahoo(data);

    return Yahoo_topStocks;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const getTopStockFromFMP = async (tickerSymbol: string) => {
  try {
    const ENDPOINT = process.env.FGP_ENDPOINT;
    const API_KEY = process.env.FGP_API_KEY;

    if (!ENDPOINT) {
      throw new Error("FGP ENDPOINT is not defined");
    }
    if (!API_KEY) {
      throw new Error("FGP API KEY is not defined");
    }

    const url = `${ENDPOINT}/${tickerSymbol}?period=${ANNUAL_PERIOD}&apikey=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Fetch doesnt work");
    }

    const data = await response.json();
    const FMPTopStocks = resolveFMP(data);

    if (!FMPTopStocks) {
      return null;
    }

    return FMPTopStocks;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
