import TopStockReports from "./components/TopStockReports";
import TableDescription from "./components/TableDescription";
import { mockYahooData } from "@/lib/mockedYahooData";

const TopStocks = async () => {
  //const Yahoo_topStocks = await getTopStocksFromYahoo();
  //console.log("====", Yahoo_topStocks);

  //const FMPTopStocks = await getTopStockFromFMP(tickerSymbols);
  //console.log(FMPTopStocks);

  const tableHeaders = Object.keys(mockYahooData[0]);

  return (
    <div className="">
      <h2>Top {mockYahooData.length} stocks</h2>
      {/* component for Yahoo data */}
      {/* component for FMP DATA */}
      <TableDescription data={tableHeaders} />
      <TopStockReports data={mockYahooData} />
    </div>
  );
};

export default TopStocks;
