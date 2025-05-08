export type TFetchedTopStocks = {
  chart: {
    result: [
      {
        meta: {
          symbol: string;
          regularMarketPrice: number;
          regularMarketDayLow: number;
          regularMarketDayHigh: number;
          fiftyTwoWeekLow: number;
          fiftyTwoWeekHigh: number;
          shortName: string;
        };
      }
    ];
  };
};

export type TTopStocksYahoo = {
  currency: string;
  dayLow: number;
  dayHigh: number;
  symbol: string;
  longName: string;
  price: number;
  ftwHigh: number;
  ftwLow: number;
  //dayRange: [number, number];
  //fiftyTwoWeeks: [number, number];
};

export type TTopStocksData = {
  topStocks: Array<TTopStocksYahoo>;
};

export type TFMPData = {
  date: number;
  revenue: number;
  ebitda: number;
  eps: number;
  netIncome: number;
};
