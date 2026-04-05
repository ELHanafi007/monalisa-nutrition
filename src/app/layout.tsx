import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { Toast } from "@/components/Toast";
import { FloatingConcierge } from "@/components/FloatingConcierge";
import { NewsletterModal } from "@/components/NewsletterModal";

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
      <body>
        <CartProvider>
          {children}
          <Toast />
          <FloatingConcierge />
          <NewsletterModal />
        </CartProvider>
      </body>
    </html>
  );
}
