// app/page.tsx
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";

import NavLink from "./navLink";

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
    <Navbar>
      <NavbarContent justify="start"></NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navItems}
      </NavbarContent>
      <NavbarContent justify="end"></NavbarContent>
    </Navbar>
  );
}
