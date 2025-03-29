"use client";

import { Listbox, ListboxItem, Link, Chip, Divider } from "@nextui-org/react";
import { ListboxWrapper } from "@/ui/home/ListboxWrapper";
import { Issue } from "@prisma/client";
import { useState } from "react";
import { Pagination } from "@nextui-org/pagination";
import NextLink from "next/link";

export default function List({ 
  issues, 
  currentPage = 1, 
  totalPages = 1 
}: { 
  issues: Array<Issue>;
  currentPage?: number;
  totalPages?: number;
}) {
  const [issue_id, setIssueId] = useState(0);

  const items = issues.map(function (issue, index): React.ReactElement {
    const href = `issues/${issue.id}`;
    return (
      <ListboxItem
        key={issue.id}
        onMouseEnter={() => setIssueId(issue.id)}
        onMouseLeave={() => setIssueId(0)}
        className={`py-3 ${index !== issues.length - 1 ? "border-b border-gray-100 dark:border-gray-800" : ""} font-mono`}
      >
        <Link href={href} className="flex flex-row items-center justify-between w-full group">
          <div className="flex-1 truncate">
            <span
              className={`text-base transition-colors duration-300 truncate group-hover:text-primary ${
                issue_id === issue.id ? "text-primary" : "text-gray-700 dark:text-gray-300"
              }`}
            >
              <i className="icon-[tabler--article] mr-2 inline-block align-text-bottom text-primary opacity-80"></i>
              {issue.title}
            </span>
          </div>
          <div className="ml-4 flex-shrink-0">
            <Chip 
              size="sm" 
              variant="flat" 
              color="primary"
              className="transition-all duration-300 group-hover:bg-primary/20 w-[110px] justify-center"
              startContent={<i className="icon-[tabler--calendar] text-xs opacity-70 ml-0"></i>}
            >
              {issue.created_at.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </Chip>
          </div>
        </Link>
      </ListboxItem>
    );
  });

  return (
    <div className="flex flex-col items-center mt-6 px-4 sm:px-6 lg:px-0">
      <div className="w-full max-w-3xl mx-auto">
        <h2 className="text-xl font-medium mb-4 text-gray-800 dark:text-gray-200">
          文章列表
        </h2>
        
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
      
      <div className="mt-6 flex flex-col items-center gap-4">
        {totalPages > 1 && (
          <div className="mt-2 mb-8">
            <Pagination
              total={totalPages}
              page={currentPage}
              initialPage={currentPage}
              classNames={{
                wrapper: "gap-1",
                item: "w-8 h-8 text-sm",
              }}
              renderItem={({ ref, key, value, isActive }) => {
                const pageNumber = value;
                
                // 手动判断当前页码是否为活动状态
                const isCurrentActive = pageNumber === currentPage;
                
                if (value === "dots") {
                  return (
                    <div key={key} className="w-8 h-8 flex items-center justify-center text-gray-500">
                      ...
                    </div>
                  );
                }
                
                return (
                  <NextLink
                    key={key}
                    href={`/?page=${pageNumber}`}
                    className={`w-8 h-8 rounded-md flex items-center justify-center ${
                      isCurrentActive 
                        ? "bg-primary text-white font-medium" 
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {pageNumber}
                  </NextLink>
                );
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}