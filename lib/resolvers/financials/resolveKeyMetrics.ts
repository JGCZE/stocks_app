import { z } from "zod";

type TResolvedKeyMetricsItem = z.infer<typeof resolvedKeyMetricsSchema>;
export type TResolvedKeyMetrics = Array<TResolvedKeyMetricsItem>;

const apiKeyMetricsSchema = z.object({
  symbol: z.string(),
  date: z.string(),
  marketCap: z.union([z.string(), z.number()]),
  peRatio: z.union([z.string(), z.number()]),
  roe: z.union([z.string(), z.number()]),
  revenuePerShare: z.union([z.string(), z.number()]),
  netIncomePerShare: z.union([z.string(), z.number()]),
});

const resolvedKeyMetricsSchema = apiKeyMetricsSchema.transform((data) => ({
  symbol: String(data.symbol),
  date: String(data.date),
  marketCap: Number(data.marketCap) || 0,
  peRatio: Number(data.peRatio) || 0,
  roe: Number(data.roe) || 0,
  revenuePerShare: Number(data.revenuePerShare) || 0,
  netIncomePerShare: Number(data.netIncomePerShare) || 0,
}));

export const resolveKeyMetrics = (value: TResolvedKeyMetrics) => {
  if (!Array.isArray(value)) {
    throw new Error("resolveKeyMetrics - Input value is not an array");
  }

  try {
    const result = z.array(resolvedKeyMetricsSchema).parse(value);

    if (!result || !Array.isArray(result)) {
      throw new Error(
        "resolveKeyMetrics - Result is not an array or does not contain valid data"
      );
    }
    return result;
  } catch (error) {
    throw new Error(
      `resolveKeyMetrics - Error parsing data: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};
