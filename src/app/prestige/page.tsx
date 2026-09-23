"use client";

import React from "react";
import { useGame } from "@/context/GameContext";
import { formatMoney } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import { Sparkles, Zap, Shield, TrendingUp, RefreshCcw, Lock, CheckCircle2 } from "lucide-react";

export default function PrestigeAscensionPage() {
  const {
    player,
    cyberShards,
    prestigePerks,
    calculateAscensionGain,
    executePrestigeAscension,
    unlockPrestigePerk,
  } = useGame();

  const shardsGain = calculateAscensionGain();
  const canAscend = shardsGain > 0;

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        {/* Header Banner */}
        <div className="border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-slate-900 to-black p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl shadow-purple-950/20">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>ENDGAME ASCENSION MATRIX & CYBER SHARDS</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
              Ascension Chamber
            </h1>
            <p className="text-xs text-slate-400 max-w-xl">
              Lepaskan status fana korporat Anda. Reset kerajaan bisnis untuk memanen Cyber Shards yang membuka kekuatan permanen lintas reinkarnasi waktu.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl flex items-center gap-6">
            <div>
              <p className="text-[10px] text-slate-500 font-mono">CYBER SHARDS TERSEDIA</p>
              <p className="text-2xl font-black text-purple-400 font-mono flex items-center gap-1.5">
                <Sparkles className="w-5 h-5 text-purple-400" />
                {cyberShards} Shards
              </p>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div>
              <p className="text-[10px] text-slate-500 font-mono">PRESTIGE LEVEL</p>
              <p className="text-2xl font-black text-white font-mono">Rank {player.prestigeCount}</p>
            </div>
          </div>
        </div>

        {/* 2-Column Ascension Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Reincarnation Terminal Column */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <h2 className="text-sm font-bold text-slate-400 font-mono uppercase tracking-wider flex items-center gap-2">
                <RefreshCcw className="w-4 h-4 text-purple-400" />
                Terminal Reinkarnasi
              </h2>

              <div className="bg-purple-950/20 border border-purple-500/20 p-4 rounded-xl space-y-2">
                <p className="text-xs text-slate-300">
                  Syarat Minimal Ascension: <span className="font-mono text-amber-400 font-bold">$10.000.000 Net Worth</span>
                </p>
                <div className="flex justify-between items-center text-xs font-mono pt-2 border-t border-purple-500/20">
                  <span className="text-slate-400">Net Worth Saat Ini:</span>
                  <span className="text-cyan-400 font-bold">{formatMoney(player.netWorth)}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400">Cyber Shards Yang Didapat:</span>
                  <span className="text-purple-400 font-black text-sm">+{shardsGain} Shards</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <p className="font-bold text-white">Apa yang di-reset?</p>
                <p className="text-slate-500">• Seluruh uang tunai, bisnis, dan saham akan di-reset ke awal.</p>
                <p className="font-bold text-white pt-1">Apa yang tetap tersimpan?</p>
                <p className="text-emerald-400 font-medium">• Cyber Shards dan seluruh Perk Ascension yang sudah terbuka!</p>
              </div>

              <button
                onClick={executePrestigeAscension}
                disabled={!canAscend}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-30 text-white font-black text-xs font-mono uppercase tracking-wider shadow-lg shadow-purple-950/50 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                {canAscend ? `Lakukan Reinkarnasi (+${shardsGain} Shards)` : "Net Worth Belum Cukup"}
              </button>
            </div>
          </div>

          {/* Prestige Perks Matrix Column */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-sm font-bold text-slate-400 font-mono uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-400" />
              Permanent Cyber Artifacts
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prestigePerks.map((perk) => {
                const canAfford = cyberShards >= perk.cyberShardsCost;

                return (
                  <div
                    key={perk.id}
                    className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 transition-all ${
                      perk.isUnlocked
                        ? "bg-purple-950/10 border-purple-500/40 shadow-lg shadow-purple-950/20"
                        : "bg-slate-950/60 border-slate-800"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
                          {perk.effectType === "REVENUE_BOOST" && <TrendingUp className="w-5 h-5" />}
                          {perk.effectType === "CLICK_BOOST" && <Zap className="w-5 h-5" />}
                          {perk.effectType === "OPEX_REDUCTION" && <Shield className="w-5 h-5" />}
                          {perk.effectType === "STOCK_DIVIDEND" && <Sparkles className="w-5 h-5" />}
                        </div>
                        {perk.isUnlocked ? (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            AKTIF
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[11px] font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-full font-bold">
                            <Sparkles className="w-3 h-3" />
                            {perk.cyberShardsCost} Shards
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-white text-base">{perk.name}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{perk.description}</p>
                    </div>

                    <button
                      onClick={() => unlockPrestigePerk(perk.id)}
                      disabled={perk.isUnlocked || !canAfford}
                      className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        perk.isUnlocked
                          ? "bg-slate-900 text-slate-500 cursor-default"
                          : canAfford
                          ? "bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-950/40"
                          : "bg-slate-900/60 border border-slate-800 text-slate-600 cursor-not-allowed"
                      }`}
                    >
                      {perk.isUnlocked ? (
                        "Terbuka Permanen"
                      ) : canAfford ? (
                        <>Buka Perk ({perk.cyberShardsCost} Shards)</>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" /> Butuh {perk.cyberShardsCost} Shards
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
