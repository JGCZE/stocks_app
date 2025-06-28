import { z } from "zod";

type TResolvedCFStatementItem = z.infer<typeof resolvedCFStatementsSchema>;
export type TResolvedCFStatements = Array<TResolvedCFStatementItem>;

const apiCFStatementsSchema = z.object({
  symbol: z.string(),
  date: z.string(),
  freeCashFlow: z.union([z.string(), z.number()]),
  capitalExpenditure: z.union([z.string(), z.number()]),
  netChangeInCash: z.union([z.string(), z.number()]),
  netDividendsPaid: z.union([z.string(), z.number()]),
});

const resolvedCFStatementsSchema = apiCFStatementsSchema.transform((data) => ({
  symbol: String(data.symbol),
  date: String(data.date),
  freeCashFlow: Number(data.freeCashFlow) || 0,
  capitalExpenditure: Number(data.capitalExpenditure) || 0,
  netChangeInCash: Number(data.netChangeInCash) || 0,
  netDividendsPaid: Number(data.netDividendsPaid) || 0,
}));

const resolveCFStatements = (value: TResolvedCFStatements) => {
  if (!Array.isArray(value)) {
    throw new Error("resolveCFStatements - Input value is not an array");
  }

  try {
    const result = z.array(resolvedCFStatementsSchema).parse(value);

    if (!result || !Array.isArray(result)) {
      throw new Error(
        "resolveCFStatements - Result is not an array or does not contain valid data"
      );
    }

    return result;
  } catch (error) {
    throw new Error(
      `resolveCFStatements - Error parsing data: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};

export default resolveCFStatements;
