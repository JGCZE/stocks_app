import removeEmpty from "../../utils/removeEmpty";
import { TFetchedTopStocks } from "../types";

const resolveTopStocksFromYahoo = (data: TFetchedTopStocks) => {
  if (!data) {
    return null;
  }

  const rawData = data.chart.result[0].meta;

  const topStocks = {
    symbol: rawData.symbol,
    price: rawData.regularMarketPrice,
    name: rawData.shortName,
    dayRange: {
      min: rawData.regularMarketDayLow,
      max: rawData.regularMarketDayHigh,
    },
    fiftyTwoWeeks: {
      min: rawData.fiftyTwoWeekLow,
      max: rawData.fiftyTwoWeekHigh,
    },
  };

  return removeEmpty(topStocks);
};
export default resolveTopStocksFromYahoo;
