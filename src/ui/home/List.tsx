"use client";

import { Listbox, ListboxItem, Link, Chip, Divider } from "@nextui-org/react";
import { ListboxWrapper } from "@/ui/home/ListboxWrapper";
import { Issue } from "@prisma/client";
import { useState } from "react";

export default function List({ issues }: { issues: Array<Issue> }) {
  const [issue_id, setIssueId] = useState(0);

  const items = issues.map(function (issue, index): React.ReactElement {
    const href = `issues/${issue.id}`;
    return (
      <ListboxItem
        key={issue.id}
        onMouseEnter={() => setIssueId(issue.id)}
        onMouseLeave={() => setIssueId(0)}
        className={`py-3 ${index !== issues.length - 1 ? "border-b border-gray-100 dark:border-gray-800" : ""}`}
      >
        <Link href={href} className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-col gap-1 max-w-[75%]">
            <span
              className={`text-lg font-medium transition-colors duration-200 truncate ${
                issue_id === issue.id ? "text-primary" : "text-gray-800 dark:text-gray-200"
              }`}
            >
              {issue.title}
            </span>
            <p className="text-gray-500 text-sm line-clamp-2">
              {issue.body?.substring(0, 120)}
              {issue.body && issue.body.length > 120 ? "..." : ""}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 min-w-[120px] ml-4">
            <Chip 
              size="sm" 
              variant="flat" 
              color="primary"
              className="transition-transform duration-200 hover:scale-105"
            >
              {issue.created_at.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Chip>
          </div>
        </Link>
      </ListboxItem>
    );
  });

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
        文章列表
      </h2>
      <ListboxWrapper>
        <Listbox 
          aria-label="文章列表" 
          color="primary" 
          variant="flat"
          className="p-0"
        >
          {items.length > 0 ? items : (
            <div className="py-8 text-center text-gray-500">
              暂无文章
            </div>
          )}
        </Listbox>
      </ListboxWrapper>
    </div>
  );
}
