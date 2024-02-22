import { CreateLink, DeleteLink, GetLink } from "@/functions/links";
import { Link } from "@/types/Link";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const id = parseInt(url.searchParams.get("id") ?? "");
  if (isNaN(id)) {
    return NextResponse.json({}, { status: 400 });
  }

  const link = await GetLink(id);
  return NextResponse.json(link);
};

export const POST = async (request: NextRequest) => {
  const body: {
    link: Link;
    user: number;
  } = await request.json();

  const link = await CreateLink(body.link, body.user);

  return NextResponse.json(link);
};

export const DELETE = async (request: NextRequest) => {
  const url = new URL(request.url);
  const id = parseInt(url.searchParams.get("id") ?? "");
  if (isNaN(id)) {
    return NextResponse.json({}, { status: 400 });
  }

  await DeleteLink(id);

  return NextResponse.json({});
};
