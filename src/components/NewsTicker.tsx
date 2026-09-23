"use client";

import React from "react";
import { useGame } from "@/context/GameContext";
import { Newspaper, TrendingUp, AlertTriangle } from "lucide-react";

export function NewsTicker() {
  const { news } = useGame();
  const latestNews = news[0];

  if (!latestNews) return null;

  return (
    <div className="bg-[#080d17] border-b border-slate-800/80 px-6 py-2 flex items-center justify-between text-xs select-none overflow-hidden">
      <div className="flex items-center gap-2 text-cyan-400 font-bold shrink-0">
        <Newspaper className="w-3.5 h-3.5 animate-pulse" />
        <span className="uppercase tracking-widest text-[10px]">CYBER NEWS WIRE:</span>
      </div>

      <div className="flex-1 mx-4 overflow-hidden whitespace-nowrap">
        <div className="text-slate-300 font-mono text-[11px] truncate">
          <span className="text-amber-400 font-bold">[{latestNews.timestamp}]</span> {latestNews.title}
        </div>
      </div>

      <div className="shrink-0 flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
        <TrendingUp className="w-3 h-3" />
        <span>PASAR AKTIF</span>
      </div>
    </div>
  );
}
