export const ANNUAL_PERIOD = "annual";
export const QUARTERLY_PERIOD = "quarter";
export const MAX_RANGE = "range=max";

export const TOP_STOCKS_SYMBOLS: Array<string> = [
  "msft",
  "aapl",
  "nvda",
  "meta",
  "brk-b",
  "tsla",
  "amzn",
  "googl",
  "jpm",
  "nflx",
];

export const DEFAULT_COLUMN_LABELS: Record<string, string> = {
  longName: "Company",
  symbol: "Ticker",
  price: "Price",
  dayLow: "Day low",
  dayHigh: "Day high",
  ftwLow: "52w low",
  ftwHigh: "52w high",
  currency: "USD",
};
