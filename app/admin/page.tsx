import { getStockDataAndSave } from '@/actions/fetchAndSave';
import React from 'react'
import { ClientComponent } from './components/ClientComponent';

export const onFetch = async () => {
  try {
    const data = await getStockDataAndSave();
    return data;
  } catch (error) {
    console.error("Error fetching and saving stock data:", error);
  }
}

const Admin = async () => {
  const data = await onFetch();

  if (!data) {
    return <div>Error fetching data</div>;
  }

  console.log("Fetched data: >>", data);

  // todo api route to fetch all stocks data
  // todo save all stocks data to db
  // todo display all stocks data in table

  return (
    <div>
      <p> this button fetch all 10 stocks data </p>
      <ClientComponent />
    </div>
  )
}

export default Admin;
