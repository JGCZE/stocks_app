
import React from 'react'
import FetchingPanel from '../components/FetchingPanel';

const Stocks = async ({ params  } : { params : Promise<{ slug: string }> }) => {
  const data = (await params).slug;
  const decodedData = decodeURIComponent(data);
  const batchID = decodedData.split('=')[1];
  /* TODO KONTROLA NA SRING */

  return (
    <div>
      <FetchingPanel batchNumber={batchID} />

      {/* {fetchedData && (
        <div>
          <h2 className="text-lg font-semibold">Fetched Stock Data</h2>
          <pre className="bg-gray-100 p-4 rounded-lg">
            {JSON.stringify(Object.keys(fetchedData), null, 2)}
          </pre>
        </div>
      )} */}
    </div>
  )
}

export default Stocks
