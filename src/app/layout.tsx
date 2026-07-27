import type { Metadata, Viewport } from "next";
import { Jost, Shippori_Mincho } from "next/font/google";
import "./globals.css";

// Jost: geométrica tipo Futura (inspiración Nike). Para titulares en mayúsculas.
const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-jost",
});

// Shippori Mincho: serif japonesa, para acentos sutiles (estilo café minimalista).
const mincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-mincho",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2a1d15",
};

export const metadata: Metadata = {
  title: "AURA · Studio",
  description:
    "AURA Studio — peluquería & barbería. Reserva tu hora con confirmación por WhatsApp. Estética minimalista.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${jost.variable} ${mincho.variable}`}>
      <body>{children}</body>
    </html>
  );
}
