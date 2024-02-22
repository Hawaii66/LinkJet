import { GetUserLinks } from "@/functions/links";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const id = parseInt(url.searchParams.get("id") ?? "");
  if (isNaN(id)) {
    return NextResponse.json({}, { status: 400 });
  }

  const links = await GetUserLinks(id);

  return NextResponse.json(links);
};
