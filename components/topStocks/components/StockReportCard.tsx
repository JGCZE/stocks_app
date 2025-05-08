import { TTopStocksYahoo } from "@/lib/types";
import Link from "next/link";

export interface StockReport {
  symbol: string;
  eps: number;
  averageEbitdaGrowth: number;
  averageNetIncomeGrowth: number;
  averageRevenueGrowth: number;
}

interface IProps {
  report: TTopStocksYahoo;
}

const StockReportCard = ({ report }: IProps) => {
  const { currency, symbol, longName } = report;
  return (
    <Link href={`/}`} className="flex gap-2">
      <p>{currency}</p>
      <p>{symbol}</p>
      <p>{longName}</p>
    </Link>
  );
};

export default StockReportCard;
