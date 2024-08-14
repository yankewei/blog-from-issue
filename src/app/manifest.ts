import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "yankewei's blog",
    short_name: "Kewei",
    description:
      "This is a yankewei's blog that generated from a github repository",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    categories: ["blog", "php", "Nextjs", "javascript", "编程"],
  };
}
