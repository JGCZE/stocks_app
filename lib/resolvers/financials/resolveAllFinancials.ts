import resolveCFStatements, {
  TResolvedCFStatements,
} from "./resolveCFStatements";
import resolveIncomeStatement, {
  TResolvedIncomeStatement,
} from "./resolveIncomeStatements";

export interface IReturn {
  resolvedCFStatement: TResolvedCFStatements;
  resolvedIncomeStatement: TResolvedIncomeStatement;
}

const resolveAllFinancials = (
  fetchedCFStatement: TResolvedCFStatements,
  fetchedIncomeStatement: TResolvedIncomeStatement
): IReturn => {
  const resolvedCFStatement = resolveCFStatements(fetchedCFStatement);
  const resolvedIncomeStatement = resolveIncomeStatement(
    fetchedIncomeStatement
  );
  // TEMPORARY DISABLED BECAUSE OF API CHANGES FROM THEIR SIDE
  //const resolvedKeyMetrics = resolveKeyMetrics(fetchedKeyMetrics);

  if (!resolvedIncomeStatement) {
    throw new Error("Failed to resolve income statement");
  }

  if (!resolvedCFStatement) {
    throw new Error("Failed to resolve cash flow statement");
  }

  return {
    resolvedCFStatement,
    resolvedIncomeStatement,
  };
};

export default resolveAllFinancials;
