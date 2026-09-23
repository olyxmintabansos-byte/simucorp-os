"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, TrendingUp, Cpu, Crosshair, Sparkles } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  const isEmpire = pathname === "/";
  const isMarket = pathname === "/market";
  const isResearch = pathname === "/research";
  const isRaider = pathname === "/raider";
  const isPrestige = pathname === "/prestige";

  return (
    <nav className="h-16 border-b border-slate-800 bg-[#090d16] px-6 flex items-center justify-between select-none overflow-x-auto">
      <Link href="/" className="flex items-center gap-3 flex-shrink-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/20">
          <Building2 className="w-5 h-5" />
        </div>
        <div className="hidden sm:block">
          <h1 className="font-black text-sm text-white tracking-wider font-mono flex items-center gap-1.5 whitespace-nowrap">
            SIMUCORP <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">CYBER ECONOMY</span>
          </h1>
          <p className="text-[10px] text-slate-400">Global Conglomerate & Stock Market Simulator</p>
        </div>
      </Link>

      <div className="flex items-center gap-1 bg-[#101726] border border-slate-800 p-1 rounded-xl text-xs overflow-x-auto">
        <Link
          href="/"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${ isEmpire ? "bg-cyan-500 text-slate-950 shadow-sm" : "text-slate-400 hover:text-white"
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Markas Empire</span>
          <span className="sm:hidden">Empire</span>
        </Link>

        <Link
          href="/market"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
            isMarket ? "bg-cyan-500 text-slate-950 shadow-sm" : "text-slate-400 hover:text-white"
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Bursa Wall Street</span>
          <span className="sm:hidden">Market</span>
        </Link>

        <Link
          href="/research"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
            isResearch ? "bg-cyan-500 text-slate-950 shadow-sm" : "text-slate-400 hover:text-white"
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">R&D Tech Tree</span>
          <span className="sm:hidden">R&D</span>
        </Link>

        <Link
          href="/raider"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
            isRaider ? "bg-red-500 text-slate-950 shadow-sm" : "text-slate-400 hover:text-white"
          }`}
        >
          <Crosshair className="w-3.5 h-3.5" />
          <span className="hidden md:inline">M&A Raider</span>
          <span className="md:hidden">Raider</span>
        </Link>

        <Link
          href="/prestige"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
            isPrestige ? "bg-purple-500 text-white shadow-sm" : "text-slate-400 hover:text-white"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Prestige</span>
          <span className="md:hidden">Prestige</span>
        </Link>
      </div>
    </nav>
  );
}
