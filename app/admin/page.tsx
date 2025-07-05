import React from "react";
import { StockDataManager } from "./components/StockDataManager";
import { saveStocksToDB } from "@/actions/fetchAndSave";

const Admin = async () => {
  saveStocksToDB();
  return <StockDataManager />;
  /* TODO něco domyslet, info o posledním ukládání, možná logování errorů apod */
};

export default Admin;
