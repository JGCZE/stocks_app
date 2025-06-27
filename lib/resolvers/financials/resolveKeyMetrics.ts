type TKeyMetricsProps = Record<string, string | number>;
type TKeyMetrics = Record<string, string | number>;

export const resolveKeyMetrics = (value: Array<TKeyMetricsProps>): Array<TKeyMetrics> => {

  const updatedData = value.map((
    { symbol, date, marketCap, peRatio, roe, revenuePerShare, netIncomePerShare }
  ) => {

    return {
      symbol,
      date,
      marketCap,
      netIncomePerShare,
      peRatio,
      revenuePerShare,
      roe,
    }
  }
  )

  return updatedData;
};
