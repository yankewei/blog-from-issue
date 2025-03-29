"use client";

import { useTheme } from "next-themes";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      isIconOnly
      variant="light"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="切换主题"
    >
      {theme === "dark" ? (
        <i className="icon-[tabler--sun]"></i>
      ) : (
        <i className="icon-[tabler--moon]"></i>
      )}
    </Button>
  );
}