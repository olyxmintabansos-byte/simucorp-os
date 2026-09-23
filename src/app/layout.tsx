import type { Metadata } from "next";
import "./globals.css";
import { GameProvider } from "@/context/GameContext";
import { HeaderHUD } from "@/components/HeaderHUD";
import { NewsTicker } from "@/components/NewsTicker";

export const metadata: Metadata = {
  title: "SimuCorp: Cyber Economy & Empire Simulator",
  description: "Heavyweight Business Simulation, Stock Market, and Conglomerate Tycoon OS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="bg-[#06090e] text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-950">
        <GameProvider>
          <HeaderHUD />
          <NewsTicker />
          {children}
        </GameProvider>
      </body>
    </html>
  );
}
