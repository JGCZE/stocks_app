type TKeyMetricsProps = Record<string, string | number>;
type TKeyMetrics = Record<string, string | number>;

export const resolveKeyMetrics = ({ value }: { value: Array<TKeyMetricsProps>}): Array<TKeyMetrics> => {

  const updatedData = value.map((
    { symbol, marketCap, peRatio, roe, revenuePerShare, netIncomePerShare }
  ) => {
    
    return {
      symbol,
      marketCap,
      netIncomePerShare,
      peRatio,
      revenuePerShare,
      roe,
  }}
  )

  return updatedData;
};
