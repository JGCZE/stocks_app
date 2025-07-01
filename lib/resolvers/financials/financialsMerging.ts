import { TResolvedCFStatements } from "./resolveCFStatements";
import { TResolvedIncomeStatement } from "./resolveIncomeStatements";
import { TFinancialsData } from "@/actions/fetchAndSave";

interface IProps {
  resolvedCFStatement: TResolvedCFStatements;
  resolvedIncomeStatement: TResolvedIncomeStatement;
}

const financialMerging = ({
  resolvedCFStatement,
  resolvedIncomeStatement,
}: IProps): Array<TFinancialsData> => {
  const mergingResult = resolvedCFStatement.map((cfItem) => {
    const findMatch = resolvedIncomeStatement.find(
      (item) => item.symbol === cfItem.symbol && item.date === cfItem.date
    );

    if (findMatch) {
      return {
        ...cfItem,
        ...findMatch,
      };
    }
  });

  return mergingResult.filter(
    (item): item is TFinancialsData => item !== undefined
  );
};

export default financialMerging;
