import { Inter } from "next/font/google";
import "@/ui/globals.css";
import { Providers } from "@/app/providers";
import Nav from "@/ui/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Yankewei's blog",
  description: "Write every thing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <Nav />
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}