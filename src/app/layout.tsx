import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Monalisa Nutrition | The Standard of Excellence",
  description: "The premier destination for luxury sports nutrition in the Kingdom of Morocco. Elevating performance through purity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
