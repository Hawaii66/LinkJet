import { Link } from "@/types/Link";
import { PrismaClient, links } from "@prisma/client";

function ToLink(dblink: links) {
  const link: Link = {
    created_at: dblink.created_at!,
    id: Number(dblink.id),
    url: dblink.url,
    category: dblink.category ?? undefined,
  };

  return link;
}

export async function GetLink(id: number) {
  const prisma = new PrismaClient();

  const dblink = await prisma.links.findFirst({
    where: {
      id: id,
    },
  });

  if (!dblink) {
    return undefined;
  }

  return ToLink(dblink);
}

export async function GetUserLinks(user: number) {
  const prisma = new PrismaClient();

  const dblinks = await prisma.links.findMany({
    where: {
      user_id: user,
    },
  });

  const links = dblinks.map(ToLink);

  return links;
}

export async function CreateLink(link: Link, user: number) {
  const prisma = new PrismaClient();

  const createdLink = await prisma.links.create({
    data: {
      url: link.url,
      user_id: user,
      category: link.category,
      created_at: new Date(),
    },
  });

  return ToLink(createdLink);
}

export async function DeleteLink(id: number) {
  const prisma = new PrismaClient();

  await prisma.links.delete({
    where: {
      id: id,
    },
  });
}
