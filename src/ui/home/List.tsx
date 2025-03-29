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
        className={`py-4 ${index !== issues.length - 1 ? "border-b border-gray-100 dark:border-gray-800" : ""}`}
      >
        <Link href={href} className="flex flex-row items-center justify-between w-full group">
          <div className="flex flex-col gap-2 max-w-[75%]">
            <span
              className={`text-lg font-medium transition-colors duration-300 truncate group-hover:text-primary ${
                issue_id === issue.id ? "text-primary" : "text-gray-800 dark:text-gray-200"
              }`}
            >
              <i className="icon-[tabler--article] mr-2 inline-block align-text-bottom text-primary opacity-80"></i>
              {issue.title}
            </span>
            <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed">
              {issue.body?.substring(0, 120)}
              {issue.body && issue.body.length > 120 ? "..." : ""}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 min-w-[120px] ml-4">
            <Chip 
              size="sm" 
              variant="flat" 
              color="primary"
              className="transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/20"
              startContent={<i className="icon-[tabler--calendar] text-xs opacity-70"></i>}
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
      <div className="not-prose text-center mb-8">
        <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          文章列表
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          探索精选内容，获取最新见解与深度分析
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-primary/60 to-secondary/60 mx-auto mt-4 rounded-full"></div>
      </div>
      
      <div className="w-full max-w-3xl mx-auto">
        <ListboxWrapper className="shadow-sm dark:shadow-zinc-800/10 rounded-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-md">
          <Listbox 
            aria-label="文章列表" 
            color="primary" 
            variant="flat"
            className="p-0"
          >
            {items.length > 0 ? items : (
              <div className="py-12 text-center text-gray-500 dark:text-gray-400">
                <i className="icon-[tabler--article-off] block mx-auto mb-3 text-3xl opacity-70"></i>
                暂无文章
              </div>
            )}
          </Listbox>
        </ListboxWrapper>
      </div>
      
      {items.length > 0 && (
        <div className="mt-6 text-sm text-gray-400 dark:text-gray-500 flex items-center">
          <i className="icon-[tabler--info-circle] mr-1.5"></i>
          共 {items.length} 篇文章
        </div>
      )}
    </div>
  );
}
