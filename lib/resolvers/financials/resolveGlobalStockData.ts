import { TFinancialsData } from "@/actions/fetchAndSave";

type StockDataItem = {
  symbol: string;
  date: string;
  [key: string]: string | number;
};

type StockDataMap = {
  [symbol: string]: Array<StockDataItem>;
};

const resolveGlobalStockData = (results: Array<Array<TFinancialsData>>) => {
  const groupedData = results.reduce((accumulator, stockDataArray) => {

    if (stockDataArray.length > 0) {
      const symbol = stockDataArray[0].symbol;
      accumulator[symbol] = stockDataArray;
    }

    return accumulator;
  }, {}  as StockDataMap );

  return groupedData;
}

export default resolveGlobalStockData;
