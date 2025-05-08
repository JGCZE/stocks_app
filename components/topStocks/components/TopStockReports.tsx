import React from "react";
import StockReportCard from "./StockReportCard";
import { TTopStocksData } from "@/lib/types";

interface IProps {
  data: TTopStocksData[`topStocks`];
}

const TopStockReports = ({ data }: IProps) => {
  console.log(data);
  return (
    <div className="gap-4">
      {data.map((report) => (
        <StockReportCard key={report.symbol} report={report} />
      ))}
    </div>
  );
};

export default TopStockReports;
