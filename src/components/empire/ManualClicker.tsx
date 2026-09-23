"use client";

import React, { useState } from "react";
import { useGame } from "@/context/GameContext";
import { formatMoney } from "@/lib/utils";
import { Zap, Sparkles } from "lucide-react";

export function ManualClicker() {
  const { player, clickTerminal } = useGame();
  const [clickSparks, setClickSparks] = useState<{ id: number; text: string; x: number; y: number }[]>([]);

  const handleTap = (e: React.MouseEvent<HTMLButtonElement>) => {
    const earned = clickTerminal();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const sparkId = Date.now() + Math.random();
    setClickSparks((prev) => [...prev.slice(-5), { id: sparkId, text: `+${formatMoney(earned)}`, x, y }]);
    setTimeout(() => {
      setClickSparks((prev) => prev.filter((s) => s.id !== sparkId));
    }, 800);
  };

  return (
    <div className="bg-[#0b101b] border border-cyan-500/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden select-none neon-border-cyan">
      <div className="relative z-10">
        <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1 flex items-center justify-center gap-1.5">
          <Zap className="w-4 h-4" /> Terminal Operasi Eksekutif
        </h3>
        <p className="text-xs text-slate-400 mb-4 max-w-sm">
          Tekan tombol di bawah untuk menghasilkan pendapatan instan dari transaksi arbitrase manual
        </p>

        <button
          onClick={handleTap}
          className="w-40 h-40 rounded-full bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 active:scale-95 transition-all duration-100 flex flex-col items-center justify-center text-slate-950 font-black shadow-2xl shadow-cyan-500/30 cursor-pointer border-4 border-cyan-400/40 relative"
        >
          <Zap className="w-12 h-12 mb-1 text-white animate-bounce" />
          <span className="text-sm tracking-wider uppercase text-white font-extrabold">EKSEKUSI</span>
          <span className="text-[10px] text-cyan-200 font-mono mt-0.5">+{formatMoney(player.clickMultiplier)}/tap</span>

          {/* Floating Click Sparks */}
          {clickSparks.map((spark) => (
            <span
              key={spark.id}
              style={{ left: spark.x, top: spark.y }}
              className="absolute pointer-events-none text-xs font-black font-mono text-amber-300 animate-out fade-out slide-out-to-top-8 duration-700"
            >
              {spark.text}
            </span>
          ))}
        </button>
      </div>
    </div>
  );
}
