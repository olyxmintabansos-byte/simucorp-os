"use client";

import React from "react";
import { useGame } from "@/context/GameContext";
import { formatMoney } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import { Cpu, Zap, Server, Flame, CheckCircle2, Lock, Sparkles } from "lucide-react";

export default function ResearchPage() {
  const { techNodes, researchTech, player } = useGame();

  const researchedCount = techNodes.filter((t) => t.isResearched).length;
  const progressPercent = Math.round((researchedCount / techNodes.length) * 100);

  const renderIcon = (type: string) => {
    switch (type) {
      case "zap": return <Zap className="w-5 h-5 text-amber-400" />;
      case "cpu": return <Cpu className="w-5 h-5 text-cyan-400" />;
      case "server": return <Server className="w-5 h-5 text-indigo-400" />;
      case "flame": return <Flame className="w-5 h-5 text-rose-400" />;
      default: return <Cpu className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#06090e]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h1 className="text-xl font-black text-white flex items-center gap-2">
              R&D Tech Tree & Laboratorium Inovasi
              <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono">
                {progressPercent}% TERBUKA
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Teliti terobosan teknologi baru untuk menggandakan pendapatan pasif dan menghapus biaya opex
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400">Teknologi Terkuasai:</span>
            <div className="text-lg font-black text-cyan-400 font-mono">
              {researchedCount} / {techNodes.length} Inovasi
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full" style={{ width: `${progressPercent}%` }} />
        </div>

        {/* Tech Nodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {techNodes.map((tech) => {
            const canAfford = player.cash >= tech.cost;

            return (
              <div
                key={tech.id}
                className={`p-5 rounded-2xl border flex flex-col justify-between transition-all select-none relative overflow-hidden ${
                  tech.isResearched
                    ? "bg-[#0b1814] border-emerald-500/40 shadow-lg shadow-emerald-500/5"
                    : canAfford
                    ? "bg-[#0f172a] border-cyan-500/40 hover:border-cyan-400"
                    : "bg-[#090d16] border-slate-800/80 opacity-70"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      {renderIcon(tech.iconType)}
                    </div>
                    {tech.isResearched ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" /> SELESAI
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-500">{tech.branch}</span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-white mb-1">{tech.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{tech.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 mt-2 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-cyan-300 font-mono font-bold text-[11px]">{tech.multiplierText}</span>
                    <span className="font-mono font-black text-amber-400">{formatMoney(tech.cost)}</span>
                  </div>

                  {!tech.isResearched ? (
                    <button
                      onClick={() => researchTech(tech.id)}
                      disabled={!canAfford}
                      className="w-full py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-30 text-slate-950 font-black text-xs rounded-xl shadow-md cursor-pointer transition-all"
                    >
                      Riset Teknologi Ini
                    </button>
                  ) : (
                    <div className="w-full py-1.5 text-center text-xs text-emerald-400 font-bold font-mono">
                      Perk Aktif Permanen
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
