import { getCompanyChartData } from "@/lib/companyActions";
import ChartComponent from "./components/ChartComponent";

const page = async ({ params }: { params: Promise<{ company: string }> }) => {
  const { company: tickerSymbol } = await params;

  //const companyData = await getCompanyData(company);
  const chartsData = await getCompanyChartData(tickerSymbol);
  
  if (!chartsData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {tickerSymbol}
      <ChartComponent chartsData={chartsData}/>
    </div>
  );
};

export default page;
