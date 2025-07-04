/* import { SAPData } from "../public/StocksStaticData/S&P500_symbols"
import * as fs from "node:fs";

const BRATCHES = [
  SAPData.slice(0, 100).map(item => item.Symbol),
  SAPData.slice(100, 200).map(item => item.Symbol),
  SAPData.slice(200, 300).map(item => item.Symbol),
  SAPData.slice(300, 400).map(item => item.Symbol),
  SAPData.slice(400, 500).map(item => item.Symbol),
  SAPData.slice(500, 600).map(item => item.Symbol),
]

export const createBatch =  async () =>{

  for (let index = 1; index < 7; index++) {    
    const filePath = `./public/StocksStaticData/batchOfStocks_${index}.json`;
    const batchJSON = JSON.stringify(BRATCHES[index -1], null, 2);
    
    fs.writeFile(filePath, batchJSON, (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      } else {
        console.log(`Batch  ${index} written to ${filePath}`);
      }
    });
  }
}
 */
