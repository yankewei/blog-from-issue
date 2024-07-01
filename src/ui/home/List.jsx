"use client";

import { Listbox, ListboxItem } from "@nextui-org/react";
import { ListboxWrapper } from "@/ui/home/ListboxWrapper";
import MyCard from "@/ui/home/Card";

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

  const items = articles.map(function (article) {
    return (
      <ListboxItem key={article.id}>
        <MyCard title={article.title} />
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
