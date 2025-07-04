export type TFetchedTopStocks = {
  meta: {
    symbol: string;
    regularMarketPrice: number;
    regularMarketDayLow: number;
    regularMarketDayHigh: number;
    fiftyTwoWeekLow: number;
    fiftyTwoWeekHigh: number;
    longName: string;
  };
};

export type TTopStocksYahoo = {
  longName: string;
  symbol: string;
  price: number;
  dayLow: number;
  dayHigh: number;
  ftwLow: number;
  ftwHigh: number;
  //currency: string;
  //dayRange: [number, number];
  //fiftyTwoWeeks: [number, number];
};

export type TTablesDescription = {
  longName: string;
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

export type TFormatedChardData = {
  period: string;
  min: number;
  max: number;
};

export type TSAPData = Array<{
  Symbol: string;
  Security: string;
  "GICS Sector": string;
  "GICS Sub-Industry": string;
  "Headquarters Location": string;
  CIK: number;
  "Date added": string;
  Founded: number | string;
}>;

export type TCompleteStocksData = {
  symbol: string;
} & {
  financials: Array<TFinancialsData>;
};

export type TFinancialsData = {
  symbol: string;
  date: string;
  freeCashFlow: number;
  capitalExpenditure: number;
  netChangeInCash: number;
  netDividendsPaid: number;
  revenue: number;
  costOfRevenue: number;
  grossProfit: number;
  ebitda: number;
  netIncome: number;
  eps: number;
};
