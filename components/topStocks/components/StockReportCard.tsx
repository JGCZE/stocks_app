import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export interface StockReport {
  symbol: string;
  eps: number;
  averageEbitdaGrowth: number;
  averageNetIncomeGrowth: number;
  averageRevenueGrowth: number;
}

interface StockReportCardProps {
  report: StockReport;
}

const StockReportCard = ({ report }: StockReportCardProps) => {
  const {
    symbol,
    eps,
    averageEbitdaGrowth,
    averageNetIncomeGrowth,
    averageRevenueGrowth,
  } = report;

  const metrics: { label: string; value: number }[] = [
    { label: "EPS", value: eps },
    { label: "EBITDA Growth (avg)", value: averageEbitdaGrowth },
    { label: "Net Income Growth (avg)", value: averageNetIncomeGrowth },
    { label: "Revenue Growth (avg)", value: averageRevenueGrowth },
  ];

  const title = symbol === "META" ? "Facebook" : symbol;

  return (
    <Link href={`/${symbol}`}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{symbol}</CardDescription>
        </CardHeader>

        {metrics.map(({ label, value }) => (
          <CardContent key={label} className="flex justify-between p-2">
            <span>{label} - </span>
            <span>{value} % </span>
          </CardContent>
        ))}
      </Card>
    </Link>
  );
};

export default StockReportCard;
