import type { Metadata } from "next";
import { Karla as FontSans } from "next/font/google";

import "@/styles/globals.css";
import { cn } from "@/lib/utils";

import Navbar from "@/components/nav-bar";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "My recipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "container min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="py-4">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
