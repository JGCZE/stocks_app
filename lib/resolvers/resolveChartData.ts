import { TFormatedChardData } from "../types";

export type TChartData = {
  meta: {
    dataGranularity: string;
    range: string;
  };
  timestamp: Array<number>;
  indicators: {
    quote: Array<{
      low: Array<number>;
      high: Array<number>;
    }>;
    adjclose: Array<{
      adjclose: Array<number>;
    }>;
  };
};

export const resolveChartData = ({ result }: { result: Array<TChartData> }): Array<TFormatedChardData> => {
  if (!result.length || !Array.isArray(result)) {
    throw new Error("Invalid result format");
  }

  const { meta, timestamp, indicators } = result[0];

  if (meta.dataGranularity !== "3mo" || meta.range !== "max" || !timestamp.length) {
    throw new Error("Date granularity is not 3mo or range is not max");
  }

  const { low, high } = indicators.quote[0];

  if (!low.length || !high.length) {
    throw new Error("No indicators data found");
  }

  if (low.length !== high.length || low.length !== timestamp.length) {
    throw new Error("Low and high data arrays are not the same length");
  }

  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  return timestamp.map((time, index) => {
    const lowValue = Math.round(low[index] * 100) / 100;
    const highValue = Math.round(high[index] * 100) / 100;

    const period = dateFormatter.format(new Date(time * 1000));

    return {
      period,
      min: lowValue,
      max: highValue,
    };
  });
}
