import { mockedChartAdjustedData } from "../mockedYahooData";

export type TChartData = {
  meta: {
    dataGranularity: string;
    range: string;
  };
  timestamp: Array<number>;
  indicators: {
    quote: Array<unknown>;
    adjclose: Array<{
      adjclose: Array<number>;
    }>;
  };
};

export const resolveChartData = ({ result }: { result: Array<TChartData> }) => {
  if (!result || !Array.isArray(result)) {
    throw new Error("Invalid result format");
  }

  const { meta, indicators } = result[0];

  if (meta.dataGranularity !== "3mo" || meta.range !== "max") {
    throw new Error("Date granularity is not 3mo or range is not max");
  }

  const chardData = indicators.adjclose[0].adjclose;

  if (!chardData) {
    throw new Error("No adjclose data found");
  }

  console.log("XXX >>", chardData);
};
