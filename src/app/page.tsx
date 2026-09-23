"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { useGame } from "@/context/GameContext";
import { BusinessCard } from "@/components/empire/BusinessCard";
import { ManualClicker } from "@/components/empire/ManualClicker";
import { BusinessTier } from "@/types/simucorp";
import { Building2, Layers, Sparkles } from "lucide-react";

export default function EmpirePage() {
  const { businesses } = useGame();
  const [selectedTier, setSelectedTier] = useState<number>(0); // 0 = All

  const filteredBusinesses = businesses.filter((b) =>
    selectedTier === 0 ? true : b.tier === selectedTier
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#06090e]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        {/* Top Split: Manual Clicker + Sector Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <ManualClicker />
          </div>

          <div className="lg:col-span-7 bg-[#0b101b] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  <span>Pohon Bisnis Konglomerasi</span>
                </h2>
                <span className="text-xs text-slate-400 font-mono">
                  {businesses.filter((b) => b.level > 0).length} / {businesses.length} Unit Aktif
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Kembangkan kerajaan bisnis Anda dari kedai kopi ritel mikro, bertransformasi menjadi konglomerasi industri, pusat riset komputasi kuantum, hingga penguasa energi fusi bersih global.
              </p>
            </div>

            {/* Tier Filters */}
            <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-slate-800/80">
              <button
                onClick={() => setSelectedTier(0)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedTier === 0
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                    : "bg-[#101726] text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                Semua Sektor
              </button>
              <button
                onClick={() => setSelectedTier(1)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedTier === 1
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                    : "bg-[#101726] text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                Tier 1: Ritel Mikro
              </button>
              <button
                onClick={() => setSelectedTier(2)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedTier === 2
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                    : "bg-[#101726] text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                Tier 2: Manufaktur
              </button>
              <button
                onClick={() => setSelectedTier(3)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedTier === 3
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                    : "bg-[#101726] text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                Tier 3: Teknologi AI
              </button>
              <button
                onClick={() => setSelectedTier(4)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedTier === 4
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                    : "bg-[#101726] text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                Tier 4: Global Titan
              </button>
            </div>
          </div>
        </div>

        {/* Business Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredBusinesses.map((b) => (
            <BusinessCard key={b.id} business={b} />
          ))}
        </div>
      </main>
    </div>
  );
}
