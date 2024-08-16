"use client";

import { Listbox, ListboxItem, Link, Spacer } from "@nextui-org/react";
import { ListboxWrapper } from "@/ui/home/ListboxWrapper";
import { Issue } from "@prisma/client";
import { useState } from "react";

export default function List({ issues }: { issues: Array<Issue> }) {
  const [issue_id, setIssueId] = useState(0);

  const items = issues.map(function (issue): React.ReactElement {
    const href = `issues/${issue.id}`;
    return (
      <ListboxItem
        key={issue.id}
        onMouseEnter={() => setIssueId(issue.id)}
        onMouseLeave={() => setIssueId(0)}
      >
        <Link href={href} className="flex flex-row items-center justify-start">
          <p className="flex flex-row gap-2 items-center">
            <span
              className={issue_id === issue.id ? "text-black" : "text-gray-500"}
            >
              {issue.title}{" "}
            </span>
            <span className="text-gray-400 text-sm">
              {issue.created_at.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </p>
        </Link>
      </ListboxItem>
    );
  });

  return (
    <div className="flex flex-col items-center mt-10">
      <ListboxWrapper>
        <Listbox aria-label="Listbox Variants" color="primary" variant="light">
          {items}
        </Listbox>
      </ListboxWrapper>
    </div>
  );
}
