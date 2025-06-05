import { getStockDataAndSave } from '@/actions/fetchAndSave';
import React from 'react'
import { ClientComponent } from './components/ClientComponent';
import { mockedKeyMetrics } from '@/lib/mockedFMPdata';
import { resolveKeyMetrics } from '@/lib/resolvers/resolveKeyMetrics';
import resolveIncomeStatements from '@/lib/resolvers/resolveIncomeStatements';

export const onFetch = async () => {
  await getStockDataAndSave();
}

const Admin = async () => {

  // TESTING
  //const data = mockedKeyMetrics;
  //resolveKeyMetrics(data);

  const dataIncome = mockedKeyMetrics
  resolveIncomeStatements(dataIncome);

  return (
    <div>
      <p> this button fetch all 10 stocks data </p>
      <ClientComponent />
    </div>
  )
}

export default Admin;
