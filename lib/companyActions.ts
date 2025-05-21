"use server";

import { MAX_RANGE } from "./constants";
import { resolveChartData } from "./resolvers/resolveChartData";
import { TFormatedChardData } from "./types";

/* export const getCompanyData = async (tickerSybol: string) => {
  try {
    const response = await fetch();
  } catch (error) {}
};
 */

type TChartData = {
  chartData: Array<TFormatedChardData>;
  granularity: string;
};

export const getCompanyChartData = async (
  tickerSymbol: string
): Promise<TChartData | undefined> => {
  try {
    const endpoint = process.env.YAHOO_CHART_ENDPOINT;
    const url = `${endpoint}/${tickerSymbol}?${MAX_RANGE}`;

    const response = await fetch(url, { next: { revalidate: 8 * 3600 } }); // 8 hours

    if (!response.ok) {
      throw new Error("Fetch doesnt work");
    }

    const { chart } = await response.json();

    if (!chart || !chart?.result || chart.error) {
      throw new Error("Error fetching chart data", chart.error);
    }

    const granularity = chart.result[0].meta.dataGranularity;

    if (!granularity) {
      throw new Error("No granularity data found");
    }

    const chartData = resolveChartData(chart);

    if (!chartData.length || !Array.isArray(chartData)) {
      throw new Error("Invalid chart data format");
    }
  
    return {
      chartData,
      granularity,
    }
  } catch (error) {
    console.error("getCompanyChartData error:", error);
    return undefined;
  }
};
