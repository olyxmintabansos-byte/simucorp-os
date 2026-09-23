"use client";

import React, { useState } from "react";
import { useGame } from "@/context/GameContext";
import { formatMoney } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import { Crosshair, ShieldAlert, Zap, TrendingUp, DollarSign } from "lucide-react";

export default function CorporateRaiderPage() {
  const { player, targets, buyTargetShares, hostileTakeover } = useGame();
  const [selectedTargetId, setSelectedTargetId] = useState<string>(targets[0]?.id || "target-1");

  const selectedTarget = targets.find((t) => t.id === selectedTargetId) || targets[0];

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        {/* Header Banner */}
        <div className="border border-red-500/30 bg-gradient-to-r from-red-950/40 via-slate-900 to-black p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl shadow-red-950/20">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
              <Crosshair className="w-3.5 h-3.5 animate-pulse" />
              <span>SYNDICATE M&A / HOSTILE TAKEOVER DIVISION</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
              Corporate Raider War Room
            </h1>
            <p className="text-xs text-slate-400 max-w-xl">
              Lancarkan manuver akuisisi agresif, beli blok saham entitas kompetitor, atau jalankan Hostile Takeover paksa untuk melipatgandakan valuasi dan sinergi pendapatan konglomerat.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl flex items-center gap-6">
            <div>
              <p className="text-[10px] text-slate-500 font-mono">WAR CHEST (CASH)</p>
              <p className="text-lg font-black text-emerald-400 font-mono">{formatMoney(player.cash)}</p>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div>
              <p className="text-[10px] text-slate-500 font-mono">CONGLOMERATE NET WORTH</p>
              <p className="text-lg font-black text-cyan-400 font-mono">{formatMoney(player.netWorth)}</p>
            </div>
          </div>
        </div>

        {/* 2-Column War Room Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Target List Column */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-sm font-bold text-slate-400 font-mono uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              Target Acquisition Matrix
            </h2>

            <div className="space-y-3">
              {targets.map((tgt) => {
                const isSelected = tgt.id === selectedTargetId;
                return (
                  <div
                    key={tgt.id}
                    onClick={() => setSelectedTargetId(tgt.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? "bg-slate-900 border-red-500/50 shadow-lg shadow-red-950/30"
                        : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-red-400">{tgt.ticker}</span>
                      {tgt.isAcquired ? (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                          TERAKUISISI 100%
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
                          {tgt.acquisitionProgress}% TERKUASAI
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-white text-sm mt-1">{tgt.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{tgt.industry}</p>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          tgt.isAcquired ? "bg-emerald-500" : "bg-gradient-to-r from-red-600 to-amber-500"
                        }`}
                        style={{ width: `${tgt.acquisitionProgress}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action & Synergy Detail Column */}
          {selectedTarget && (
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-black text-white">{selectedTarget.name}</h2>
                      <span className="px-2.5 py-0.5 rounded bg-red-500/20 text-red-400 font-mono text-xs font-bold border border-red-500/30">
                        {selectedTarget.ticker}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{selectedTarget.description}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] text-slate-500 font-mono">TOTAL VALUATION</p>
                    <p className="text-xl font-black text-amber-400 font-mono">
                      {formatMoney(selectedTarget.valuation)}
                    </p>
                  </div>
                </div>

                {/* Intelligence Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-900/60 border border-slate-800/80 p-3 rounded-xl">
                    <p className="text-[10px] text-slate-500 font-mono">KONTROL SAHAM ANDA</p>
                    <p className="text-lg font-black text-white font-mono mt-0.5">
                      {selectedTarget.acquisitionProgress}%
                    </p>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800/80 p-3 rounded-xl">
                    <p className="text-[10px] text-slate-500 font-mono">BONUS SINERGI LABA</p>
                    <p className="text-lg font-black text-emerald-400 font-mono mt-0.5 flex items-center gap-1">
                      <Zap className="w-4 h-4 text-emerald-400" />
                      +{Math.round((selectedTarget.synergyMultiplier - 1) * 100)}% Laba
                    </p>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800/80 p-3 rounded-xl">
                    <p className="text-[10px] text-slate-500 font-mono">TAKTIK PERTAHANAN DIREKSI</p>
                    <p className="text-xs font-bold text-red-400 mt-1.5 truncate">
                      {selectedTarget.defenseTactic}
                    </p>
                  </div>
                </div>

                {/* Execution Terminal */}
                {selectedTarget.isAcquired ? (
                  <div className="bg-emerald-950/20 border border-emerald-500/30 p-6 rounded-xl text-center space-y-2">
                    <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-emerald-400">Target Berhasil Ditaklukkan!</h3>
                    <p className="text-xs text-slate-400 max-w-md mx-auto">
                      Konglomerat Anda kini memegang kendali eksekutif penuh atas entitas ini. Seluruh multiplier sinergi laba sebesar +{Math.round((selectedTarget.synergyMultiplier - 1) * 100)}% aktif permanen pada neraca kas Anda.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 pt-2">
                    <h3 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
                      Manuver Pembelian Blok Saham
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Beli 10% */}
                      <button
                        onClick={() => buyTargetShares(selectedTarget.id, 10)}
                        disabled={player.cash < (selectedTarget.valuation * 10) / 100}
                        className="bg-slate-900 border border-slate-800 hover:border-slate-700 disabled:opacity-40 p-4 rounded-xl text-left transition-all group"
                      >
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="text-white font-bold group-hover:text-cyan-400">Akuisisi Blok 10%</span>
                          <span className="text-amber-400 font-bold">{formatMoney((selectedTarget.valuation * 10) / 100)}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">Pembelian saham gradual tanpa memicu klausul defensif.</p>
                      </button>

                      {/* Beli 25% */}
                      <button
                        onClick={() => buyTargetShares(selectedTarget.id, 25)}
                        disabled={player.cash < (selectedTarget.valuation * 25) / 100}
                        className="bg-slate-900 border border-slate-800 hover:border-slate-700 disabled:opacity-40 p-4 rounded-xl text-left transition-all group"
                      >
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="text-white font-bold group-hover:text-cyan-400">Akuisisi Blok 25%</span>
                          <span className="text-amber-400 font-bold">{formatMoney((selectedTarget.valuation * 25) / 100)}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">Kuasai kursi komisaris dan percepat integrasi operasional.</p>
                      </button>
                    </div>

                    {/* Hostile Takeover Aggressive Button */}
                    <div className="pt-4 border-t border-slate-800/80">
                      <div className="bg-gradient-to-r from-red-950/30 to-slate-900 p-4 rounded-xl border border-red-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-red-400 flex items-center gap-1.5">
                            <Zap className="w-4 h-4 text-red-400" />
                            Hostile Takeover (Pengambilalihan Paksa)
                          </h4>
                          <p className="text-xs text-slate-400">
                            Beli sisa {100 - selectedTarget.acquisitionProgress}% saham sekaligus di pasar terbuka dengan premium harga 25%.
                          </p>
                        </div>

                        <button
                          onClick={() => hostileTakeover(selectedTarget.id)}
                          disabled={
                            player.cash <
                            Math.round(
                              ((selectedTarget.valuation * (100 - selectedTarget.acquisitionProgress)) / 100) * 1.25
                            )
                          }
                          className="w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 disabled:opacity-40 text-white font-black text-xs font-mono uppercase tracking-wider shadow-lg shadow-red-950/50 transition-all whitespace-nowrap"
                        >
                          Eksekusi Serangan:{" "}
                          {formatMoney(
                            Math.round(
                              ((selectedTarget.valuation * (100 - selectedTarget.acquisitionProgress)) / 100) * 1.25
                            )
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
