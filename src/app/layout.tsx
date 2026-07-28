import type { Metadata, Viewport } from "next";
import { Jost, Shippori_Mincho } from "next/font/google";
import { PWARegister } from "@/components/common/PWARegister";
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
  applicationName: "AURA",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AURA",
  },
  // Los íconos se resuelven por convención de archivos: app/icon.svg (favicon)
  // y app/apple-icon.png (apple-touch-icon). Los íconos de la PWA van en manifest.ts.
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${jost.variable} ${mincho.variable}`}>
      <body>
        {children}
        <PWARegister />
      </body>
    </html>
  );
}
