import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mapa das Forças do SER",
  description: "Leitura de Energia Pessoal (Qi) — Geometria do SER"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
