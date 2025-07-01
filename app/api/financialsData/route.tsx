import { getGlobalStockData } from "@/actions/fetchAndSave";

export async function GET(request: Request) {
  const response = await getGlobalStockData();

  if (!response) {
    throw new Error("XKNDNDFNJNJENJ");
  }

  return Response.json({ response });
}
