import { GetLink } from "@/functions/links";
import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const id = parseInt(url.searchParams.get("id") ?? "");
  if (isNaN(id)) {
    return NextResponse.json({}, { status: 404 });
  }

  const link = await GetLink(id);
  if (!link) {
    return NextResponse.json({}, { status: 404 });
  }

  const response = await fetch(link.url);
  if (response.status !== 200) {
    return NextResponse.json({}, { status: 404 });
  }

  const html = await response.text();

  const $ = cheerio.load(html);
  const ogImage = $('meta[property="og:image"]').attr("content");

  if (!ogImage) {
    return NextResponse.json({}, { status: 404 });
  }

  return NextResponse.redirect(ogImage);
};
