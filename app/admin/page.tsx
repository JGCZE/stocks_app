import React from "react";
import { StockDataManager } from "./components/StockDataManager";

const Admin = async () => {

  return (
    <div>
      <p> this button fetch all 10 stocks data </p>
      <StockDataManager />
    </div>
  );
};

export default Admin;
