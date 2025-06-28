import resolveCFStatements, {
  TResolvedCFStatements,
} from "./resolveCFStatements";
import resolveIncomeStatement, {
  TResolvedIncomeStatement,
} from "./resolveIncomeStatements";
import { resolveKeyMetrics, TResolvedKeyMetrics } from "./resolveKeyMetrics";

const resolveAllFinancials = (
  fetchedCFStatement: TResolvedCFStatements,
  fetchedIncomeStatement: TResolvedIncomeStatement,
  fetchedKeyMetrics: TResolvedKeyMetrics
) => {
  const resolvedCFStatement = resolveCFStatements(fetchedCFStatement);
  const resolvedIncomeStatement = resolveIncomeStatement(
    fetchedIncomeStatement
  );
  const resolvedKeyMetrics = resolveKeyMetrics(fetchedKeyMetrics);

  if (!resolvedKeyMetrics || !resolvedIncomeStatement || !resolvedCFStatement) {
    throw new Error("Failed to resolve one or more statements");
  }

  return {
    resolvedCFStatement,
    resolvedIncomeStatement,
    resolvedKeyMetrics,
  };
};

export default resolveAllFinancials;
