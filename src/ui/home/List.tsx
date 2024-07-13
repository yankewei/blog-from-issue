"use client";

import { Listbox, ListboxItem, Link, Card, CardBody } from "@nextui-org/react";
import { ListboxWrapper } from "@/ui/home/ListboxWrapper";
import { Issue } from "@prisma/client";

export default function List({ issues }: { issues: Array<Issue> }) {
  const items = issues.map(function (issue): React.ReactElement {
    const href = `issues/${issue.id}`;
    return (
      <ListboxItem key={issue.id}>
        <Link href={href}>
          <Card shadow="none">
            <CardBody>
              <p>{issue.title}</p>
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
