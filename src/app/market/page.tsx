"use client";

import React, { useState, useEffect } from "react";
import { useGame } from "@/context/GameContext";
import { formatMoney } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Briefcase,
  Zap,
  Globe,
  Award,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function MarketPage() {
  const { stocks, portfolio, buyStock, sellStock, player, executeIPO, commodities } = useGame();
  const [selectedStockId, setSelectedStockId] = useState<string>(stocks[0]?.id || "stk-1");
  const [tradeShares, setTradeShares] = useState<number>(100);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const selectedStock = stocks.find((s) => s.id === selectedStockId) || stocks[0];
  const userHolding = portfolio.find((p) => p.stockId === selectedStockId);
  const totalCost = selectedStock.currentPrice * tradeShares;
  const canBuy = player.cash >= totalCost;
  const canSell = userHolding && userHolding.sharesOwned >= tradeShares;

  return (
    <div className="flex flex-col min-h-screen bg-[#06090e]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        {/* Market Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h1 className="text-xl font-black text-white flex items-center gap-2">
              Virtual Wall Street & Commodity Exchange
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono">
                LIVE TICKS
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Bursa saham korporat virtual, grafik harga real-time, transaksi lot saham & dividen
            </p>
          </div>

          {/* IPO Banner */}
          {!player.isIPOCompleted ? (
            <div className="flex items-center gap-3 bg-[#111827] border border-amber-500/40 p-2.5 rounded-2xl">
              <div>
                <div className="text-xs font-bold text-amber-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Opsi IPO Perusahaan:
                </div>
                <div className="text-[10px] text-slate-400">Syarat: Net Worth $5,000,000</div>
              </div>
              <button
                onClick={executeIPO}
                disabled={player.netWorth < 5000000}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-30 text-slate-950 font-black text-xs rounded-xl shadow-md cursor-pointer transition-all"
              >
                Go Public (+$10M)
              </button>
            </div>
          ) : (
            <div className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold font-mono flex items-center gap-1.5">
              <Award className="w-4 h-4 text-purple-400" />
              <span>EMITEN PUBLIK TERDAFTAR (IPO SELESAI)</span>
            </div>
          )}
        </div>

        {/* 4 Stock Ticker Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stocks.map((stk) => {
            const isSelected = stk.id === selectedStockId;
            const isUp = stk.changePercent >= 0;

            return (
              <div
                key={stk.id}
                onClick={() => setSelectedStockId(stk.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all select-none ${
                  isSelected
                    ? "bg-[#111827] border-cyan-500 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500"
                    : "bg-[#0b101b] border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-black text-lg text-white">{stk.ticker}</span>
                  <span
                    className={`text-xs font-mono font-bold flex items-center gap-0.5 px-2 py-0.5 rounded ${
                      isUp ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                    }`}
                  >
                    {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span>{stk.changePercent > 0 ? "+" : ""}{stk.changePercent}%</span>
                  </span>
                </div>

                <div className="text-xs text-slate-400 truncate mb-3">{stk.name}</div>

                <div className="flex items-baseline justify-between pt-2 border-t border-slate-800/80">
                  <span className="text-lg font-black text-white font-mono">
                    {formatMoney(stk.currentPrice)}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Div: {(stk.dividendYield * 100).toFixed(1)}%</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Stock Chart & Order Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chart (8 cols) */}
          <div className="lg:col-span-8 bg-[#0b101b] border border-slate-800 rounded-2xl p-5 flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div>
                <h2 className="text-base font-black text-white flex items-center gap-2">
                  <span className="font-mono text-cyan-400">{selectedStock.ticker}</span>
                  <span>— {selectedStock.name}</span>
                </h2>
                <span className="text-xs text-slate-400">Sektor: {selectedStock.sector}</span>
              </div>
              <div className="text-right">
                <div className="text-xl font-black text-white font-mono">
                  {formatMoney(selectedStock.currentPrice)}
                </div>
                <span className="text-[10px] text-slate-500 font-mono">Real-time Trading Feed</span>
              </div>
            </div>

            <div className="h-64 w-full">
              {isMounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={selectedStock.priceHistory}>
                    <defs>
                      <linearGradient id="stockColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={selectedStock.color} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={selectedStock.color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} domain={["auto", "auto"]} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", fontSize: "12px" }}
                      formatter={(val: any) => [formatMoney(Number(val) || 0), "Harga"]}
                    />
                    <Area type="monotone" dataKey="price" stroke={selectedStock.color} strokeWidth={2} fillOpacity={1} fill="url(#stockColor)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Trade Execution Panel (4 cols) */}
          <div className="lg:col-span-4 bg-[#0b101b] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-cyan-400" /> Terminal Transaksi Saham
              </h3>

              <div className="space-y-3 bg-[#111827] p-3.5 rounded-xl border border-slate-800 text-xs mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Kepemilikan Anda:</span>
                  <span className="font-mono font-bold text-white">{userHolding ? userHolding.sharesOwned : 0} Lembar</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Harga Beli Rata-rata:</span>
                  <span className="font-mono text-slate-300">
                    {userHolding ? formatMoney(userHolding.averageBuyPrice) : "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Estimasi Nilai Posisi:</span>
                  <span className="font-mono font-black text-amber-400">
                    {userHolding ? formatMoney(userHolding.sharesOwned * selectedStock.currentPrice) : "$0"}
                  </span>
                </div>
              </div>

              {/* Shares Stepper */}
              <div>
                <label className="text-xs text-slate-400 block mb-1">Jumlah Saham (Lembar):</label>
                <div className="flex gap-2 mb-2">
                  {[10, 50, 100, 500].map((qty) => (
                    <button
                      key={qty}
                      onClick={() => setTradeShares(qty)}
                      className={`flex-1 py-1 rounded-lg border text-xs font-mono font-bold ${
                        tradeShares === qty ? "bg-cyan-500/20 border-cyan-500 text-cyan-300" : "bg-slate-900 border-slate-800 text-slate-400"
                      }`}
                    >
                      {qty}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min="1"
                  value={tradeShares}
                  onChange={(e) => setTradeShares(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-[#131b2c] border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono font-bold text-white"
                />
              </div>

              <div className="mt-3 pt-3 border-t border-slate-800 flex justify-between text-xs">
                <span className="text-slate-400">Total Nilai Transaksi:</span>
                <span className="font-mono font-black text-cyan-400">{formatMoney(totalCost)}</span>
              </div>
            </div>

            {/* Buy / Sell Buttons */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <button
                onClick={() => buyStock(selectedStock.id, tradeShares)}
                disabled={!canBuy}
                className="py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer"
              >
                Beli Saham
              </button>
              <button
                onClick={() => sellStock(selectedStock.id, tradeShares)}
                disabled={!canSell}
                className="py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-30 text-white font-black text-xs shadow-md transition-all cursor-pointer"
              >
                Jual Saham
              </button>
            </div>
          </div>
        </div>

        {/* Commodity Market Quick Table */}
        <div className="bg-[#0b101b] border border-slate-800 rounded-2xl p-5">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <Globe className="w-4 h-4 text-amber-400" />
            <span>Pasar Bahan Mentah & Komoditas Riil</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {commodities.map((c) => (
              <div key={c.id} className="p-3.5 rounded-xl bg-[#111827] border border-slate-800 flex justify-between items-center text-xs">
                <div>
                  <div className="font-bold text-white">{c.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{c.symbol} • Per {c.unit}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-white">{formatMoney(c.currentPrice)}</div>
                  <span className={`text-[10px] font-mono font-bold ${c.trend === "UP" ? "text-emerald-400" : "text-rose-400"}`}>
                    {c.trend === "UP" ? "▲ NAIK" : "▼ TURUN"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
