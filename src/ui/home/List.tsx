"use client";

import { Listbox, ListboxItem, Link, Card, CardBody } from "@nextui-org/react";
import { ListboxWrapper } from "@/ui/home/ListboxWrapper";

export default function List() {
  const articles = [
    {
      id: 1,
      title: "【Go】数组",
    },
    {
      id: 2,
      title: "Laravel + Vue 实战中遇到的问题",
    },
  ];

  const items = articles.map(function (article): React.ReactElement {
    const href = `posts/${article.id}`;
    return (
      <ListboxItem key={article.id}>
        <Link href={href}>
          <Card shadow="none">
            <CardBody>
              <p>{article.title}</p>
            </CardBody>
          </Card>
        </Link>
      </ListboxItem>
    );
  });

  return (
    <div className="flex flex-col gap-4">
      <ListboxWrapper>
        <Listbox
          aria-label="Listbox Variants"
          color="primary"
          variant="bordered"
        >
          {items}
        </Listbox>
      </ListboxWrapper>
    </div>
  );
}
