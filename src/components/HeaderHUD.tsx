"use client";

import React from "react";
import { useGame } from "@/context/GameContext";
import { formatMoney } from "@/lib/utils";
import { DollarSign, TrendingUp, Award, Zap, ShieldAlert, RotateCcw } from "lucide-react";

export function HeaderHUD() {
  const { player, injectAngelCapital, resetGame } = useGame();

  return (
    <div className="bg-[#0b101b] border-b border-slate-800 px-6 py-3 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Company Title & Rank */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/20">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-black text-white tracking-wider uppercase font-mono">
                {player.companyName}
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold font-mono">
                LEVEL {player.level}
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Gelar: <strong className="text-slate-200">{player.title}</strong></span>
            </p>
          </div>
        </div>

        {/* Financial Gauges */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {/* Cash On Hand */}
          <div className="bg-[#101726] border border-cyan-500/30 rounded-xl px-4 py-2 neon-border-cyan">
            <span className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider block">Saldo Kas (Cash)</span>
            <div className="text-xl font-black text-white font-mono mt-0.5">
              {formatMoney(player.cash)}
            </div>
          </div>

          {/* Revenue Per Second */}
          <div className="bg-[#101726] border border-emerald-500/30 rounded-xl px-4 py-2 neon-border-emerald">
            <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider block">Arus Kas Pasif</span>
            <div className="text-xl font-black text-emerald-400 font-mono mt-0.5 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              <span>+{formatMoney(player.revenuePerSecond)}/dtk</span>
            </div>
          </div>

          {/* Net Worth */}
          <div className="bg-[#101726] border border-amber-500/30 rounded-xl px-4 py-2 neon-border-amber">
            <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider block">Nilai Valuasi (Net Worth)</span>
            <div className="text-xl font-black text-amber-400 font-mono mt-0.5">
              {formatMoney(player.netWorth)}
            </div>
          </div>

          {/* Quick Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={injectAngelCapital}
              className="px-3 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black rounded-xl text-xs shadow-md cursor-pointer transition-all active:scale-95"
              title="Dapatkan suntikan modal venture capital instan +$250,000"
            >
              + Injeksi Modal
            </button>
            <button
              onClick={resetGame}
              className="p-2 bg-slate-900 hover:bg-rose-950 text-slate-400 hover:text-rose-400 border border-slate-800 rounded-xl text-xs cursor-pointer"
              title="Reset Permainan / Mulai Baru"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
