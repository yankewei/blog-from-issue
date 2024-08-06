import { Label, PrismaClient } from "@prisma/client";

export default function handleLabelCreated(payload: object): Promise<Label> {
  const label_raw = payload["label"];

  const prisma = new PrismaClient();
  return prisma.label.create({
    data: {
      name: label_raw["name"],
      description: label_raw["description"],
      color: label_raw["color"],
    },
  });
}
