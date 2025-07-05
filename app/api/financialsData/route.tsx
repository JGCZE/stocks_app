import { getGlobalStockData } from "@/actions/fetchAndSave";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const paramsURL = request.nextUrl.searchParams;
    const batch = paramsURL.get("id");

    console.log("Request URL:", batch);

    if (!batch) {
      return Response.json({ error: "Batch ID is required" }, { status: 400 });
    }

    const response = await getGlobalStockData();

    if (!response) {
      throw new Error("XKNDNDFNJNJENJ");
    }
    return Response.json({ response });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
