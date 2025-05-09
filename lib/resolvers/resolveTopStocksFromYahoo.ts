import { TFetchedTopStocks, TTopStocksYahoo } from "../types";

const resolveTopStocksFromYahoo = (
  result: Array<TFetchedTopStocks>
): TTopStocksYahoo | undefined => {
  if (!result.length) {
    return undefined;
  }

  const metaData = result[0].meta;

  if (!metaData) {
    throw new Error("no META DATA resolved");
  }

  const data: TTopStocksYahoo = {
    longName: metaData.longName,
    symbol: metaData.symbol,
    price: metaData.regularMarketPrice,
    dayLow: metaData.regularMarketDayLow,
    dayHigh: metaData.regularMarketDayHigh,
    ftwLow: metaData.fiftyTwoWeekLow,
    ftwHigh: metaData.fiftyTwoWeekHigh,
  };

  return data;
};
export default resolveTopStocksFromYahoo;
