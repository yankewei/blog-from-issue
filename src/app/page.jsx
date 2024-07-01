// app/page.tsx
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";

import NavLink from "@/ui/NavLink";
import HomeList from "@/ui/home/List";

export default function Page() {
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
  ].map(function (navItem) {
    return (
      <>
        <NavbarItem isActive={navItem.active} key={navItem.id}>
          <NavLink item={navItem} />
        </NavbarItem>
      </>
    );
  });

  return (
    <>
      <Navbar>
        <NavbarContent justify="start"></NavbarContent>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {navItems}
        </NavbarContent>
        <NavbarContent justify="end"></NavbarContent>
      </Navbar>

      <HomeList></HomeList>
    </>
  );
}
