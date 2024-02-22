"use client";

import { Children } from "@/types/Children";
import { Link } from "@/types/Link";
import { createContext, useEffect, useState } from "react";

export const LinkContext = createContext<{
  links: Link[];
  categorySorted: Map<string, Link[]>;
  actions: {
    delete: (id: number) => void;
    create: (url: string, category: string) => void;
  };
}>({
  links: [],
  categorySorted: new Map(),
  actions: { delete: () => {}, create: () => {} },
});

type Props = {
  defaultLinks: Link[];
};

export function LinkContextWrapper({
  children,
  defaultLinks,
}: Children & Props) {
  const [links, setLinks] = useState(defaultLinks);
  const [categorySorted, setCategorySorted] = useState<Map<string, Link[]>>(
    new Map()
  );

  const deleteLink = async (id: number) => {
    setLinks((l) => l.filter((i) => i.id !== id));

    await fetch("/api/link?id=${id}", {
      method: "DELETE",
    });
  };

  const createLink = async (url: string, category: string) => {
    const link = {
      url: url,
      created_at: new Date(),
      id: -1,
      category: category,
    };
    setLinks((l) => [...l, link]);

    const response = await fetch("/api/link", {
      method: "POST",
      body: JSON.stringify({
        link: link,
        user: 1,
      }),
    });

    if (response.status !== 200) {
      setLinks((l) => l.filter((i) => i.id !== -1));
      return;
    }

    const newLink = await response.json();
    setLinks((l) => [...l.filter((i) => i.id !== -1), newLink]);
  };

  useEffect(() => {
    const map = new Map<string, Link[]>();
    links.forEach((link) => {
      map.set(link.category ?? "", [
        ...(map.get(link.category ?? "") ?? []),
        link,
      ]);
    });

    setCategorySorted(map);
  }, [links]);

  return (
    <LinkContext.Provider
      value={{
        links,
        categorySorted,
        actions: {
          delete: deleteLink,
          create: createLink,
        },
      }}
    >
      {children}
    </LinkContext.Provider>
  );
}
