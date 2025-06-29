import { TFMPData } from "../types";

const mockData = [
  {
    date: "2024-12-31",
    symbol: "META",
    reportedCurrency: "USD",
    cik: "0001326801",
    fillingDate: "2025-01-30",
    acceptedDate: "2025-01-29 20:00:50",
    calendarYear: "2024",
    period: "FY",
    revenue: 164501000000,
    costOfRevenue: 30161000000,
    grossProfit: 134340000000,
    grossProfitRatio: 0.8166515705,
    researchAndDevelopmentExpenses: 43873000000,
    generalAndAdministrativeExpenses: 9740000000,
    sellingAndMarketingExpenses: 11347000000,
    sellingGeneralAndAdministrativeExpenses: 21087000000,
    otherExpenses: 0,
    operatingExpenses: 64960000000,
    costAndExpenses: 95121000000,
    interestIncome: 2517000000,
    interestExpense: 544000000,
    depreciationAndAmortization: 15498000000,
    ebitda: 86876000000,
    ebitdaratio: 0.5281183701,
    operatingIncome: 69380000000,
    operatingIncomeRatio: 0.421760354,
    totalOtherIncomeExpensesNet: 1283000000,
    incomeBeforeTax: 70663000000,
    incomeBeforeTaxRatio: 0.4295596987,
    incomeTaxExpense: 8303000000,
    netIncome: 62360000000,
    netIncomeRatio: 0.3790858414,
    eps: 24.61,
    epsdiluted: 23.86,
    weightedAverageShsOut: 2534000000,
    weightedAverageShsOutDil: 2614000000,
    link: "https://www.sec.gov/Archives/edgar/data/1326801/000132680125000017/0001326801-25-000017-index.htm",
    finalLink:
      "https://www.sec.gov/Archives/edgar/data/1326801/000132680125000017/meta-20241231.htm",
  },
  {
    date: "2023-12-31",
    symbol: "META",
    reportedCurrency: "USD",
    cik: "0001326801",
    fillingDate: "2024-02-02",
    acceptedDate: "2024-02-01 19:39:02",
    calendarYear: "2023",
    period: "FY",
    revenue: 134902000000,
    costOfRevenue: 25959000000,
    grossProfit: 108943000000,
    grossProfitRatio: 0.8075714222,
    researchAndDevelopmentExpenses: 38483000000,
    generalAndAdministrativeExpenses: 11408000000,
    sellingAndMarketingExpenses: 12301000000,
    sellingGeneralAndAdministrativeExpenses: 23709000000,
    otherExpenses: 0,
    operatingExpenses: 62192000000,
    costAndExpenses: 88151000000,
    interestIncome: 1639000000,
    interestExpense: 446000000,
    depreciationAndAmortization: 11178000000,
    ebitda: 59052000000,
    ebitdaratio: 0.437739989,
    operatingIncome: 46751000000,
    operatingIncomeRatio: 0.3465552772,
    totalOtherIncomeExpensesNet: 677000000,
    incomeBeforeTax: 47428000000,
    incomeBeforeTaxRatio: 0.351573735,
    incomeTaxExpense: 8330000000,
    netIncome: 39098000000,
    netIncomeRatio: 0.2898252064,
    eps: 15.19,
    epsdiluted: 14.87,
    weightedAverageShsOut: 2574000000,
    weightedAverageShsOutDil: 2629000000,
    link: "https://www.sec.gov/Archives/edgar/data/1326801/000132680124000012/0001326801-24-000012-index.htm",
    finalLink:
      "https://www.sec.gov/Archives/edgar/data/1326801/000132680124000012/meta-20231231.htm",
  },
  {
    date: "2022-12-31",
    symbol: "META",
    reportedCurrency: "USD",
    cik: "0001326801",
    fillingDate: "2023-02-02",
    acceptedDate: "2023-02-01 20:26:31",
    calendarYear: "2022",
    period: "FY",
    revenue: 116609000000,
    costOfRevenue: 25249000000,
    grossProfit: 91360000000,
    grossProfitRatio: 0.7834729738,
    researchAndDevelopmentExpenses: 35338000000,
    generalAndAdministrativeExpenses: 11816000000,
    sellingAndMarketingExpenses: 15262000000,
    sellingGeneralAndAdministrativeExpenses: 27078000000,
    otherExpenses: -320000000,
    operatingExpenses: 62416000000,
    costAndExpenses: 87665000000,
    interestIncome: 276000000,
    interestExpense: 276000000,
    depreciationAndAmortization: 8686000000,
    ebitda: 42241000000,
    ebitdaratio: 0.3622447667,
    operatingIncome: 33555000000,
    operatingIncomeRatio: 0.2877565197,
    totalOtherIncomeExpensesNet: -125000000,
    incomeBeforeTax: 28819000000,
    incomeBeforeTaxRatio: 0.2471421588,
    incomeTaxExpense: 5619000000,
    netIncome: 23200000000,
    netIncomeRatio: 0.1989554837,
    eps: 8.63,
    epsdiluted: 8.59,
    weightedAverageShsOut: 2687000000,
    weightedAverageShsOutDil: 2702000000,
    link: "https://www.sec.gov/Archives/edgar/data/1326801/000132680123000013/0001326801-23-000013-index.htm",
    finalLink:
      "https://www.sec.gov/Archives/edgar/data/1326801/000132680123000013/meta-20221231.htm",
  },
  {
    date: "2021-12-31",
    symbol: "META",
    reportedCurrency: "USD",
    cik: "0001326801",
    fillingDate: "2022-02-03",
    acceptedDate: "2022-02-02 21:11:04",
    calendarYear: "2021",
    period: "FY",
    revenue: 117929000000,
    costOfRevenue: 22649000000,
    grossProfit: 95280000000,
    grossProfitRatio: 0.8079437628,
    researchAndDevelopmentExpenses: 24655000000,
    generalAndAdministrativeExpenses: 9829000000,
    sellingAndMarketingExpenses: 14043000000,
    sellingGeneralAndAdministrativeExpenses: 23872000000,
    otherExpenses: 210000000,
    operatingExpenses: 48527000000,
    costAndExpenses: 71176000000,
    interestIncome: 531000000,
    interestExpense: 461000000,
    depreciationAndAmortization: 7967000000,
    ebitda: 54720000000,
    ebitdaratio: 0.4640080048,
    operatingIncome: 46753000000,
    operatingIncomeRatio: 0.3964504066,
    totalOtherIncomeExpensesNet: 531000000,
    incomeBeforeTax: 47284000000,
    incomeBeforeTaxRatio: 0.4009531159,
    incomeTaxExpense: 7914000000,
    netIncome: 39370000000,
    netIncomeRatio: 0.3338449406,
    eps: 13.99,
    epsdiluted: 13.77,
    weightedAverageShsOut: 2815000000,
    weightedAverageShsOutDil: 2859000000,
    link: "https://www.sec.gov/Archives/edgar/data/1326801/000132680122000018/0001326801-22-000018-index.htm",
    finalLink:
      "https://www.sec.gov/Archives/edgar/data/1326801/000132680122000018/fb-20211231.htm",
  },
  {
    date: "2020-12-31",
    symbol: "META",
    reportedCurrency: "USD",
    cik: "0001326801",
    fillingDate: "2021-01-28",
    acceptedDate: "2021-01-27 21:13:48",
    calendarYear: "2020",
    period: "FY",
    revenue: 85965000000,
    costOfRevenue: 16692000000,
    grossProfit: 69273000000,
    grossProfitRatio: 0.8058279532,
    researchAndDevelopmentExpenses: 18447000000,
    generalAndAdministrativeExpenses: 6564000000,
    sellingAndMarketingExpenses: 11591000000,
    sellingGeneralAndAdministrativeExpenses: 18155000000,
    otherExpenses: -34000000,
    operatingExpenses: 36602000000,
    costAndExpenses: 53294000000,
    interestIncome: 509000000,
    interestExpense: 672000000,
    depreciationAndAmortization: 6862000000,
    ebitda: 39533000000,
    ebitdaratio: 0.4598732042,
    operatingIncome: 32671000000,
    operatingIncomeRatio: 0.3800500204,
    totalOtherIncomeExpensesNet: 509000000,
    incomeBeforeTax: 33180000000,
    incomeBeforeTaxRatio: 0.3859710347,
    incomeTaxExpense: 4034000000,
    netIncome: 29146000000,
    netIncomeRatio: 0.3390449602,
    eps: 10.22,
    epsdiluted: 10.09,
    weightedAverageShsOut: 2851000000,
    weightedAverageShsOutDil: 2888000000,
    link: "https://www.sec.gov/Archives/edgar/data/1326801/000132680121000014/0001326801-21-000014-index.htm",
    finalLink:
      "https://www.sec.gov/Archives/edgar/data/1326801/000132680121000014/fb-20201231.htm",
  },
];

const resolveFMP = (fmpData: Array<TFMPData>) => {
  if (!fmpData.length) {
    return null;
  }
  //console.log(">>", fmpData);

  const rawData: Array<TFMPData> = fmpData.map((data) => {
    const FMP_topStocks = {
      symbol: data.symbol,
      date: data.calendarYear,
      revenue: data.revenue,
      ebitda: data.ebitda,
      eps: data.eps,
      netIncome: data.netIncome,
    };

    return FMP_topStocks;
  });

  const calculateAverageGrowth = (rawData: Array<TFMPData>) => {
    let revenueGrowthSum = 0;
    let ebitdaGrowthSum = 0;
    let netIncomeGrowthSum = 0;
    let numPeriods = 0;

    for (let i = 1; i < rawData.length; i++) {
      const previous = rawData[i];
      const current = rawData[i - 1];

      const revenueGrowth =
        previous.revenue > 0
          ? (current.revenue - previous.revenue) / previous.revenue
          : 0;

      const ebitdaGrowth =
        previous.ebitda > 0
          ? (current.ebitda - previous.ebitda) / previous.ebitda
          : 0;

      const netIncomeGrowth =
        previous.netIncome > 0
          ? (current.netIncome - previous.netIncome) / previous.netIncome
          : 0;

      revenueGrowthSum += revenueGrowth;
      ebitdaGrowthSum += ebitdaGrowth;
      netIncomeGrowthSum += netIncomeGrowth;
      numPeriods++;
    }

    const averageRevenueGrowth =
      numPeriods > 0 ? revenueGrowthSum / numPeriods : 0;

    const averageEbitdaGrowth =
      numPeriods > 0 ? ebitdaGrowthSum / numPeriods : 0;

    const averageNetIncomeGrowth =
      numPeriods > 0 ? netIncomeGrowthSum / numPeriods : 0;

    return {
      symbol: rawData[0].symbol,
      averageRevenueGrowth: averageRevenueGrowth * 100, // Convert to percentage
      averageEbitdaGrowth: averageEbitdaGrowth * 100,
      averageNetIncomeGrowth: averageNetIncomeGrowth * 100,
      eps: rawData[0].eps,
    };
  };

  const averageGrowth = calculateAverageGrowth(rawData);

  return averageGrowth;
};

export default resolveFMP;
