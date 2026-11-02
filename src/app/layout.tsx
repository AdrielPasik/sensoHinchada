import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Senso Hinchada | Censo colaborativo",
  description: "Una mirada colaborativa y no oficial sobre las hinchadas argentinas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
