import { TESTComponent } from "@/app/[company]/components/TESTComponent";

const page = async ({ params }: { params: Promise<{ company: string }> }) => {
  const { company: tickerSymbol } = await params;

  //const companyData = await getCompanyData(company);
  //const chartsData = await getCompanyChartData(tickerSymbol);
  //console.log("chartsData ........ >>>", chartsData);

  return (
    <div>
      {tickerSymbol}
      <TESTComponent />
    </div>
  );
};

export default page;
