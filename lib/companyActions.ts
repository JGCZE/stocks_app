"use server";

import { MAX_RANGE } from "./constants";
import { mockedChartAdjustedData } from "./mockedYahooData";
import { resolveChartData } from "./resolvers/resolveChartData";

export const getCompanyData = async (tickerSybol: string) => {
  try {
    const response = await fetch();
  } catch (error) {}
};

type TReturnChardData = {};

export const getCompanyChartData = async (
  tickerSymbol: string
): Promise<TReturnChardData | undefined> => {
  try {
    const endpoint = process.env.YAHOO_CHART_ENDPOINT;
    const url = `${endpoint}/${tickerSymbol}?${MAX_RANGE}`;

    //const response = await fetch(url, { next: { revalidate: 8 * 3600 } }); // 8 hours

    /* if (!response.ok) {
      throw new Error("Fetch doesnt work");
    }

    const { chart } = await response.json();

    if (!chart || !chart?.result || chart.error) {
      throw new Error("Error fetching chart data", chart.error);
    } */

    const chart = mockedChartAdjustedData;
    resolveChartData(chart);
    //return chart;
  } catch (error) {
    console.error("getCompanyChartData error:", error);
    return undefined;
  }
};
