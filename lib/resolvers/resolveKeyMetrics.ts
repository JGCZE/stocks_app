export const resolveKeyMetrics = (data: any) => {

  const updatedData = data.value.map((item: any) => {
    return {
      marketCap: item.marketCap,
      peRatio: item.peRatio,
      roe: item.roe,
  }}
  )

  console.log("updatedData", updatedData);
  return updatedData;
};
