import { Label, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function handleLabelCreated(payload: {
  label: { name: string; description: string; color: string };
}): Promise<Label> {
  const label_raw = payload.label;

  return prisma.label.create({
    data: {
      name: label_raw["name"],
      description: label_raw["description"],
      color: label_raw["color"],
    },
  });
}

function handleLabelEdited(payload: {
  changes: {
    name?: { from: string };
    description?: { from: string };
    color?: { from: string };
  };
  label: { name: string; description: string; color: string };
}): Promise<Label> {
  let updating = {};
  for (const [key] of Object.entries(payload.changes)) {
    updating[key] = payload.label[key];
  }

  let before_label = null;

  if ("name" in payload.changes) {
    before_label = prisma.label.findFirst({
      where: { name: payload.changes.name.from },
    });
  } else {
    before_label = prisma.label.findFirst({
      where: { name: payload.label.name },
    });
  }

  return before_label.then((label: Label) => {
    return prisma.label.update({
      data: updating,
      where: { id: label.id },
    });
  })
}

function handleLabelDeleted(payload: {
  label: { name: string };
}): Promise<Label> {
  return prisma.issueOnLabel.deleteMany({
    where: { Label: { name: payload.label.name } },
  }).then((): Promise<Label> => {
    return prisma.label.delete({
      where: { name: payload.label.name },
    });
  });
}

export { handleLabelCreated, handleLabelEdited, handleLabelDeleted };
