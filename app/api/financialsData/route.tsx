import { getGlobalStockData } from "@/actions/fetchAndSave";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const paramsURL = request.nextUrl.searchParams;
  const batch = paramsURL.get("id");

  console.log("Request URL:", batch);
  const response = await getGlobalStockData();

  if (!response) {
    throw new Error("XKNDNDFNJNJENJ");
  }

  return Response.json({ response });
}
