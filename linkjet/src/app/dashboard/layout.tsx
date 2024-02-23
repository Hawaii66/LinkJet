import { GetUserLinks } from "@/functions/links";
import { Children } from "@/types/Children";
import { Link } from "@/types/Link";
import { LinkContextWrapper } from "@/Utils/LinkContext";
import React from "react";

export const revalidate = 0;

async function Layout({ children }: Children) {
  const links = await GetUserLinks(1);

  return (
    <LinkContextWrapper defaultLinks={links}>{children}</LinkContextWrapper>
  );
}

export default Layout;
