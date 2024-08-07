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

async function handleLabelEdited(payload: {
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
    before_label = await prisma.label.findFirst({
      where: { name: payload.changes.name.from },
    });
  } else {
    before_label = await prisma.label.findFirst({
      where: { name: payload.label.name },
    });
  }

  return prisma.label.update({
    data: updating,
    where: { id: before_label.id },
  });
}

export { handleLabelCreated, handleLabelEdited };
