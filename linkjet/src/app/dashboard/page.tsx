"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { LinkContext } from "@/Utils/LinkContext";
import { Delete, ExternalLink } from "lucide-react";
import Link from "next/link";
import React, { useContext, useState } from "react";

function Page() {
  const [newLink, setNewLink] = useState<{ url: string; category: string }>({
    category: "",
    url: "",
  });
  const { categorySorted, actions } = useContext(LinkContext);

  return (
    <div className="flex justify-center flex-col items-center w-full">
      <div className="w-full pt-4 flex justify-center items-center flex-col">
        <h1 className="text-5xl text-teal-600 font-extrabold">
          HawaiiDev - Links
        </h1>
        <p className="text-2xl text-neutral-600 font-medium">
          Your personal links
        </p>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="my-4">New Link</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New link</DialogTitle>
              <DialogDescription>
                Create a new link with a category
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <Label>URL</Label>
              <Input
                value={newLink.url}
                onChange={(e) =>
                  setNewLink({ ...newLink, url: e.target.value })
                }
              />
              <Label>Category</Label>
              <Input
                value={newLink.category}
                onChange={(e) =>
                  setNewLink({ ...newLink, category: e.target.value })
                }
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  disabled={
                    newLink.url.replaceAll(" ", "").length < 3 ||
                    newLink.category.replaceAll(" ", "").length < 3
                  }
                  type="submit"
                  onClick={() => {
                    actions.create(newLink.url, newLink.category);
                    setNewLink({
                      category: "",
                      url: "",
                    });
                  }}
                >
                  Create
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Separator className="w-3/5" />
      <div className="grid grid-cols-2 w-3/5 gap-4 p-4">
        {Array.from(categorySorted).map(([name, links]) => (
          <Card key={name}>
            <CardHeader>
              <CardTitle>{name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {links.map((link) => (
                <HoverCard key={link.id}>
                  <HoverCardTrigger>
                    -{" "}
                    <Link
                      target={"_blank"}
                      className="underline"
                      href={link.url}
                      key={link.id}
                    >
                      {new URL(link.url).hostname.startsWith("www")
                        ? new URL(link.url).hostname.replace("www.", "")
                        : new URL(link.url).hostname}
                    </Link>
                  </HoverCardTrigger>
                  <HoverCardContent className="flex flex-col gap-4">
                    <img
                      className="rounded-3xl overflow-hidden"
                      src={`/api/link/preview?id=${link.id}`}
                    />
                    <p>{link.url}</p>
                    <Button
                      onClick={() => actions.delete(link.id)}
                      className="flex flex-row justify-between px-4 items-center"
                      variant={"destructive"}
                    >
                      Delete <Delete />
                    </Button>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Page;
