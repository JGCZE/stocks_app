import { TTopStocksYahoo } from "@/lib/types";
import Link from "next/link";
import { FaArrowTrendUp } from "react-icons/fa6";
interface IProps {
  report: TTopStocksYahoo;
}

const StockReportCard = ({ report }: IProps) => {
  const { symbol, longName, dayHigh, dayLow, price, ftwHigh, ftwLow } = report;
  return (
    <Link
      href={`/${symbol}`}
      className="grid grid-cols-9 border-2 mb-3 rounded-md bg-gray-50 pl-2 py-2 hover:bg-gray-100 hover:border-gray-300"
    >
      <p className="col-span-2">{longName}</p>
      <p>{symbol}</p>
      <p>{price}</p>
      <p className="text-red-500">{dayLow}</p>
      <p className="text-green-700">{dayHigh}</p>
      <p className="text-red-500">{ftwLow}</p>
      <p className="text-green-700">{ftwHigh}</p>
      <p className="flex justify-center items-center gap-2 text-blue-600">
        more <FaArrowTrendUp />
      </p>
    </Link>
  );
};

export default StockReportCard;
