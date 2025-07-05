import React from "react";
import FetchingPanel from "../components/FetchingPanel";

const Stocks = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const idNum = parseInt(id);

  if (isNaN(idNum) || idNum < 1 || idNum > 6) {
    return <div>Invalid batch ID</div>;
  }

  return (
    <div>
      <p>fetching panel</p>
      <FetchingPanel batchNumber={idNum} />

      {/* TODO - něco domyslet, ingo o posledním uložení apod */}
    </div>
  );
};

export default Stocks;
