
import type { Metadata } from "next";

import "@fontsource-variable/vazirmatn";
import "@fontsource-variable/inter";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Building Microservices | Persian Edition",
    template: "%s | Building Microservices",
  },
  description: "نسخه فارسی کتاب Building Microservices",
  applicationName: "Building Microservices Reader",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html
      lang="fa"
      dir="rtl"
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
