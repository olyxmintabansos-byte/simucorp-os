"use client";

import React from "react";
import { BusinessUnit } from "@/types/simucorp";
import { useGame } from "@/context/GameContext";
import { formatMoney } from "@/lib/utils";
import { Coffee, Store, Factory, Server, Plane, Zap, Users, ArrowUp } from "lucide-react";

export function BusinessCard({ business }: { business: BusinessUnit }) {
  const { player, upgradeBusiness, hireManager } = useGame();

  const upgradeCost = Math.round(business.baseCost * Math.pow(1.15, business.level));
  const canAffordUpgrade = player.cash >= upgradeCost;
  const currentIncome = business.baseRevenuePerSec * business.level;
  const canAffordManager = !business.managerHired && player.cash >= business.managerCost;

  const renderIcon = () => {
    switch (business.iconType) {
      case "coffee": return <Coffee className="w-6 h-6" />;
      case "shop": return <Store className="w-6 h-6" />;
      case "factory": return <Factory className="w-6 h-6" />;
      case "server": return <Server className="w-6 h-6" />;
      case "plane": return <Plane className="w-6 h-6" />;
      case "energy": return <Zap className="w-6 h-6" />;
      default: return <Store className="w-6 h-6" />;
    }
  };

  return (
    <div className="bg-[#0f172a]/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 flex flex-col justify-between transition-all duration-200 relative overflow-hidden group">
      {/* Background Accent Gradient */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${business.colorGradient} opacity-10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none`} />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${business.colorGradient} flex items-center justify-center text-white shadow-lg`}>
              {renderIcon()}
            </div>
            <div>
              <h3 className="text-sm font-black text-white group-hover:text-cyan-400 transition-colors">
                {business.name}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                  Tier {business.tier}
                </span>
                <span className="text-[10px] text-slate-400">{business.category}</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono font-bold text-white bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
              Lv. {business.level}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 my-3 p-2.5 rounded-xl bg-[#090e17] border border-slate-800/80 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 block">Pendapatan:</span>
            <span className="font-mono font-black text-emerald-400">
              +{formatMoney(currentIncome)}/dtk
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">Biaya Opex:</span>
            <span className="font-mono text-rose-400">
              -{formatMoney(business.operationalCostPerSec * business.level)}/dtk
            </span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-2 mt-2">
        <button
          onClick={() => upgradeBusiness(business.id)}
          disabled={!canAffordUpgrade}
          className={`w-full py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            canAffordUpgrade
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/20 active:scale-98"
              : "bg-slate-800/60 text-slate-500 border border-slate-800 cursor-not-allowed"
          }`}
        >
          <ArrowUp className="w-4 h-4" />
          <span>
            {business.level === 0 ? "Beli Unit Bisnis" : "Upgrade Level"} ({formatMoney(upgradeCost)})
          </span>
        </button>

        {/* Manager Button */}
        {!business.managerHired ? (
          <button
            onClick={() => hireManager(business.id)}
            disabled={!canAffordManager}
            className={`w-full py-1.5 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 border transition-all ${
              canAffordManager
                ? "bg-slate-900 border-amber-500/40 text-amber-300 hover:bg-amber-950/40 cursor-pointer"
                : "bg-slate-900/40 border-slate-800 text-slate-600 cursor-not-allowed"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Rekrut Manager ({formatMoney(business.managerCost)})</span>
          </button>
        ) : (
          <div className="py-1 text-center text-[10px] text-emerald-400 font-mono font-bold flex items-center justify-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Manager Aktif (Otomasi 100%)</span>
          </div>
        )}
      </div>
    </div>
  );
}
