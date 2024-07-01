import { Link } from "@nextui-org/react";

export default function NavLink({ item }) {
  return (
    <Link
      color={item.active ? undefined : "foreground"}
      href={item.href}
      aria-current={item.active ? "page" : undefined}
      size="md"
    >
      {item.name}
    </Link>
  );
}
