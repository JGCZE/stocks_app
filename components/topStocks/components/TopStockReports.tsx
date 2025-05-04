import React from "react";
import StockReportCard from "./StockReportCard";

type TReport = {
  symbol: string;
  eps: number;
  averageEbitdaGrowth: number;
  averageNetIncomeGrowth: number;
  averageRevenueGrowth: number;
};

interface IProps {
  data: Array<TReport>;
}

const TopStockReports = ({ data }: IProps) => {
  return (
    <div className="grid grid-rows-3 grid-cols-4 gap-4">
      {data.map((report) => (
        <StockReportCard key={report.symbol} report={report} />
      ))}
    </div>
  );
};

export default TopStockReports;
