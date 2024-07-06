import { Navbar, NavbarContent, NavbarItem, Link } from "@nextui-org/react";

export default function Nav() {
  const navItems = [
    {
      id: 0,
      name: "Home",
      active: true,
      href: "/",
    },
    {
      id: 1,
      name: "About",
      active: false,
      href: "/about",
    },
  ].map(function (item) {
    return (
      <NavbarItem isActive={item.active} key={item.id}>
        <Link
          color={item.active ? undefined : "foreground"}
          href={item.href}
          aria-current={item.active ? "page" : undefined}
          size="md"
        >
          {item.name}
        </Link>
      </NavbarItem>
    );
  });

  return (
    <Navbar>
      <NavbarContent justify="start"></NavbarContent>
      <NavbarContent className="sm:flex gap-4" justify="center">
        {navItems}
      </NavbarContent>
      <NavbarContent justify="end"></NavbarContent>
    </Navbar>
  );
}
