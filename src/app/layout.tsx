import { JetBrains_Mono } from "next/font/google";
import "@/ui/globals.css";
import { Providers } from "@/app/providers";

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono" 
});

export const metadata = {
  title: "Yankewei's blog",
  description: "Write every thing",
  openGraph: {
    title: "Yankewei's blog",
    description: "Write every thing",
    url: 'https://your-domain.com',
    siteName: "Yankewei's blog",
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Yankewei's blog",
    description: "Write every thing",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`light ${jetbrainsMono.variable}`}>
      <body className="font-mono">
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
