import { Children } from "@/types/Children";
import { Link } from "@/types/Link";
import { LinkContextWrapper } from "@/Utils/LinkContext";
import React from "react";

export const revalidate = 0;

async function Layout({ children }: Children) {
  const response = await fetch("http://localhost:3000/api/user/links?id=1");

  const links: Link[] = await response.json();

  return (
    <LinkContextWrapper defaultLinks={links}>{children}</LinkContextWrapper>
  );
}

export default Layout;
