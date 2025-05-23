import { getCompanyChartData } from "@/actions/companyActions";
import ChartComponent from "./components/ChartComponent";

const page = async ({ params }: { params: Promise<{ company: string }> }) => {
  const { company: tickerSymbol } = await params;

  //const companyData = await getCompanyData(company);
  //const data = await getCompanyChartData(tickerSymbol);

  const data = undefined;

  if (!data) {
    return <div>Company data not found</div>;
  }

  const { chartData, granularity } = data;

  return (
    <div>
      {tickerSymbol}
      {chartData && granularity && (
        <ChartComponent
          chartData={chartData}
          granularity={granularity}
        />
      )}
    </div>
  );
};

export default page;
