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

export type TTopStocks = {
  symbol: string;
  price: number;
  dayRange: [number, number];
  fiftyTwoWeeks: [number, number];
};

export type TTopStocksData = {
  topStocks: TTopStocks;
};

export type TFMPData = {
  date: number;
  revenue: number;
  ebitda: number;
  eps: number;
  netIncome: number;
};
