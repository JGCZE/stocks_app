import { z } from "zod";

type TResolvedIncomeStatementItem = z.infer<typeof resolvedIncomeStatementSchema>;
type TResolvedIncomeStatement = Array<TResolvedIncomeStatementItem>;

const apiIncomeStatementSchema = z.object({
  symbol: z.string(),
  date: z.string(),
  revenue: z.union([z.string(), z.number()]),
  costOfRevenue: z.union([z.string(), z.number()]),
  grossProfit: z.union([z.string(), z.number()]),
  ebitda: z.union([z.string(), z.number()]),
  netIncome: z.union([z.string(), z.number()]),
  eps: z.union([z.string(), z.number()]),
});

const resolvedIncomeStatementSchema = apiIncomeStatementSchema.transform((data) => ({
  symbol: String(data.symbol),
  date: String(data.date),
  revenue: Number(data.revenue) || 0,
  costOfRevenue: Number(data.costOfRevenue) || 0,
  grossProfit: Number(data.grossProfit) || 0,
  ebitda: Number(data.ebitda) || 0,
  netIncome: Number(data.netIncome) || 0,
  eps: Number(data.eps) || 0,
}));


const resolveIncomeStatement = ({ value }: { value: Array<unknown> }): TResolvedIncomeStatement => {
  if (!Array.isArray(value)) {
    throw new Error("resolveIncomeStatement - Input value is not an array");
  }

  try {
    const result = z.array(resolvedIncomeStatementSchema).parse(value);

    if (!result || !Array.isArray(result)) {
      throw new Error("resolveIncomeStatement - Result is not an array or does not contain valid data");
    }

    return result;
  } catch (error) {
    throw new Error(`resolveIncomeStatement - Error parsing data: ${error instanceof Error ? error.message : String(error)}`);
  }
};

export default resolveIncomeStatement;
