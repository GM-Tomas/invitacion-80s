import type { Metadata, Viewport } from "next";
import { Audiowide, Mr_Dafoe, Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";

const chrome = Audiowide({ weight: "400", subsets: ["latin"], variable: "--font-audiowide" });
const script = Mr_Dafoe({ weight: "400", subsets: ["latin"], variable: "--font-dafoe" });
const pixel = Press_Start_2P({ weight: "400", subsets: ["latin"], variable: "--font-press" });
const lcd = VT323({ weight: "400", subsets: ["latin"], variable: "--font-vt" });

// Título y descripción son lo que se ve al compartir el link por WhatsApp.
export const metadata: Metadata = {
  title: "BACK TO THE 80s! 🪩⚡ El cumple de Nani",
  description: "Viernes 2/10 · 20:30 hs · Olga Cosettini 1170. Prepará los calentadores y el neón.",
};

export const viewport: Viewport = { themeColor: "#0b0019" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${chrome.variable} ${script.variable} ${pixel.variable} ${lcd.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
