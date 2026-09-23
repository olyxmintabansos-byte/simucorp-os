"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  BusinessUnit,
  Commodity,
  NewsHeadline,
  PlayerStats,
  Stock,
  PortfolioHolding,
  TechNode,
  TargetCompany,
  PrestigePerk,
} from "@/types/simucorp";

const SEED_BUSINESSES: BusinessUnit[] = [
  { id: "biz-1", name: "Cyber Coffee Barista", tier: 1, category: "Ritel", level: 1, baseCost: 100, baseRevenuePerSec: 15, operationalCostPerSec: 2, iconType: "coffee", colorGradient: "from-amber-600 to-amber-900", isUnlocked: true, managerHired: false, managerCost: 1000 },
  { id: "biz-2", name: "Minimarket Otomatis 24 Jam", tier: 1, category: "Ritel", level: 0, baseCost: 1200, baseRevenuePerSec: 85, operationalCostPerSec: 15, iconType: "shop", colorGradient: "from-emerald-600 to-teal-900", isUnlocked: true, managerHired: false, managerCost: 8000 },
  { id: "biz-3", name: "Pabrik Fabrikasi Semikonduktor", tier: 2, category: "Manufaktur", level: 0, baseCost: 15000, baseRevenuePerSec: 650, operationalCostPerSec: 120, iconType: "factory", colorGradient: "from-blue-600 to-indigo-950", isUnlocked: true, managerHired: false, managerCost: 50000 },
  { id: "biz-4", name: "Hub Ekspedisi Drone Otonom", tier: 2, category: "Manufaktur", level: 0, baseCost: 85000, baseRevenuePerSec: 3200, operationalCostPerSec: 550, iconType: "server", colorGradient: "from-cyan-600 to-blue-950", isUnlocked: true, managerHired: false, managerCost: 250000 },
  { id: "biz-5", name: "Quantum Cloud & AI Lab", tier: 3, category: "Teknologi", level: 0, baseCost: 450000, baseRevenuePerSec: 18500, operationalCostPerSec: 3200, iconType: "server", colorGradient: "from-purple-600 to-indigo-950", isUnlocked: true, managerHired: false, managerCost: 1500000 },
  { id: "biz-6", name: "Sentra Server Data Center Subsea", tier: 3, category: "Teknologi", level: 0, baseCost: 2200000, baseRevenuePerSec: 92000, operationalCostPerSec: 16000, iconType: "server", colorGradient: "from-pink-600 to-purple-950", isUnlocked: true, managerHired: false, managerCost: 8000000 },
  { id: "biz-7", name: "Maskapai Dirgantara Orbital Neo", tier: 4, category: "Konglomerat", level: 0, baseCost: 15000000, baseRevenuePerSec: 580000, operationalCostPerSec: 95000, iconType: "plane", colorGradient: "from-amber-500 to-red-950", isUnlocked: true, managerHired: false, managerCost: 45000000 },
  { id: "biz-8", name: "Pembangkit Reaktor Fusi Bersih", tier: 4, category: "Konglomerat", level: 0, baseCost: 120000000, baseRevenuePerSec: 4200000, operationalCostPerSec: 680000, iconType: "energy", colorGradient: "from-emerald-500 to-cyan-950", isUnlocked: true, managerHired: false, managerCost: 350000000 },
];

const SEED_COMMODITIES: Commodity[] = [
  { id: "com-1", name: "Biji Kopi Arabika", symbol: "COFFEE", unit: "Ton", currentPrice: 3800, basePrice: 3500, priceHistory: [3400, 3500, 3600, 3800], trend: "UP", inventoryOwned: 10 },
  { id: "com-2", name: "Mikrochip Silikon", symbol: "SILICON", unit: "Wafer", currentPrice: 12400, basePrice: 11000, priceHistory: [11500, 11200, 11800, 12400], trend: "UP", inventoryOwned: 5 },
  { id: "com-3", name: "Lithium Baterai", symbol: "LITHIUM", unit: "Kg", currentPrice: 8200, basePrice: 8500, priceHistory: [8900, 8700, 8400, 8200], trend: "DOWN", inventoryOwned: 0 },
  { id: "com-4", name: "Baja Titanium Ringan", symbol: "STEEL", unit: "Ton", currentPrice: 5100, basePrice: 5000, priceHistory: [4900, 5050, 4980, 5100], trend: "UP", inventoryOwned: 20 },
];

const SEED_STOCKS: Stock[] = [
  {
    id: "stk-1",
    ticker: "CYBR",
    name: "CyberCore Robotics Inc.",
    sector: "AI & Humanoids",
    currentPrice: 420,
    basePrice: 380,
    changePercent: 10.5,
    dividendYield: 0.02,
    color: "#06b6d4",
    priceHistory: [
      { time: "09:00", price: 380 },
      { time: "10:00", price: 395 },
      { time: "11:00", price: 390 },
      { time: "12:00", price: 410 },
      { time: "13:00", price: 420 },
    ],
  },
  {
    id: "stk-2",
    ticker: "AERO",
    name: "NeoSpace Logistics Ltd.",
    sector: "Aerospace Defense",
    currentPrice: 850,
    basePrice: 860,
    changePercent: -1.2,
    dividendYield: 0.04,
    color: "#f59e0b",
    priceHistory: [
      { time: "09:00", price: 860 },
      { time: "10:00", price: 855 },
      { time: "11:00", price: 870 },
      { time: "12:00", price: 845 },
      { time: "13:00", price: 850 },
    ],
  },
  {
    id: "stk-3",
    ticker: "NEXA",
    name: "Nexa FinTech Holdings",
    sector: "Global Payments",
    currentPrice: 195,
    basePrice: 180,
    changePercent: 8.3,
    dividendYield: 0.05,
    color: "#10b981",
    priceHistory: [
      { time: "09:00", price: 180 },
      { time: "10:00", price: 185 },
      { time: "11:00", price: 190 },
      { time: "12:00", price: 192 },
      { time: "13:00", price: 195 },
    ],
  },
  {
    id: "stk-4",
    ticker: "SOLR",
    name: "Helios Clean Quantum Core",
    sector: "Clean Energy",
    currentPrice: 620,
    basePrice: 580,
    changePercent: 6.9,
    dividendYield: 0.015,
    color: "#8b5cf6",
    priceHistory: [
      { time: "09:00", price: 580 },
      { time: "10:00", price: 600 },
      { time: "11:00", price: 595 },
      { time: "12:00", price: 610 },
      { time: "13:00", price: 620 },
    ],
  },
];

const SEED_TECH_NODES: TechNode[] = [
  { id: "tech-1", name: "Sistem Kasir Neural Otomatis", branch: "Automation", description: "Menggandakan pendapatan seluruh unit Ritel Tier 1 sebesar +100%", cost: 25000, isResearched: false, multiplierText: "+100% Tier 1 Revenue", iconType: "zap" },
  { id: "tech-2", name: "Drone Logistik Otonom", branch: "Logistics", description: "Memangkas biaya operasional Manufaktur Tier 2 hingga 40%", cost: 120000, isResearched: false, multiplierText: "-40% Tier 2 Opex", iconType: "server" },
  { id: "tech-3", name: "Sub-Nanometer Lithography", branch: "Quantum", description: "Meningkatkan efisiensi output chip komputer sebesar +150%", cost: 750000, isResearched: false, multiplierText: "+150% Tech Output", iconType: "cpu" },
  { id: "tech-4", name: "DeepSeek Multi-Agent Swarms", branch: "Automation", description: "Otomatisasi 100% seluruh bisnis tanpa perlu merekrut manajer", cost: 3500000, isResearched: false, multiplierText: "Auto Managers Unlocked", iconType: "cpu" },
  { id: "tech-5", name: "Algorithmic Arbitrage Bot", branch: "Quantum", description: "Mendapatkan dividen bonus tambahan +25% dari investasi bursa saham", cost: 18000000, isResearched: false, multiplierText: "+25% Stock Dividends", iconType: "zap" },
  { id: "tech-6", name: "Orbital Zero-G Metallurgy", branch: "Logistics", description: "Meningkatkan pendapatan unit Konglomerat Tier 4 sebesar +200%", cost: 85000000, isResearched: false, multiplierText: "+200% Tier 4 Revenue", iconType: "server" },
  { id: "tech-7", name: "Miniaturized Fusion Core", branch: "Energy", description: "Menghapuskan 100% seluruh biaya energi operasional (Opex Gratis)", cost: 450000000, isResearched: false, multiplierText: "Zero Operational Costs", iconType: "flame" },
];

const SEED_TARGET_COMPANIES: TargetCompany[] = [
  {
    id: "target-1",
    name: "AeroDynamics Galactic",
    ticker: "AGAL",
    valuation: 25000000,
    marketShare: 18,
    acquisitionProgress: 0,
    synergyMultiplier: 1.25,
    isAcquired: false,
    industry: "Dirgantara & Satelit",
    description: "Pemegang lisensi peluncuran orbit rendah terkemuka. Akuisisi memberikan dorongan sinergi pendapatan 25% bagi seluruh unit Tier 4.",
    defenseTactic: "Poison Pill Share Dilution",
  },
  {
    id: "target-2",
    name: "OmniRobotics Cybernetics",
    ticker: "OMNI",
    valuation: 85000000,
    marketShare: 28,
    acquisitionProgress: 0,
    synergyMultiplier: 1.4,
    isAcquired: false,
    industry: "Robotika Industri",
    description: "Produsen lengan mekanik bertenaga AI. Akuisisi memberikan suntikan efisiensi biaya serta bonus sinergi pendapatan 40%.",
    defenseTactic: "Golden Parachute Defense",
  },
  {
    id: "target-3",
    name: "SynthaBio Genetics Corp",
    ticker: "SBIO",
    valuation: 350000000,
    marketShare: 35,
    acquisitionProgress: 0,
    synergyMultiplier: 1.6,
    isAcquired: false,
    industry: "Bioteknologi Fusi",
    description: "Monopoli paten obat regenerasi molekuler. Akuisisi mengamankan sinergi laba 60% dan dominasi pasar mutlak.",
    defenseTactic: "White Knight Pac-Man Tactic",
  },
];

const SEED_PRESTIGE_PERKS: PrestigePerk[] = [
  {
    id: "perk-1",
    name: "Quantum Nano-Catalyst",
    description: "Meningkatkan seluruh pendapatan korporasi sebesar +50% secara permanen lintas reinkarnasi.",
    cyberShardsCost: 5,
    isUnlocked: false,
    effectType: "REVENUE_BOOST",
    multiplier: 1.5,
  },
  {
    id: "perk-2",
    name: "Neural Overdrive Protocol",
    description: "Meningkatkan nilai klik manual di Terminal Eksekutif sebesar +300%.",
    cyberShardsCost: 8,
    isUnlocked: false,
    effectType: "CLICK_BOOST",
    multiplier: 4.0,
  },
  {
    id: "perk-3",
    name: "Zero-Point Superconductors",
    description: "Mengurangi biaya operasional seluruh unit bisnis sebesar 50% secara permanen.",
    cyberShardsCost: 12,
    isUnlocked: false,
    effectType: "OPEX_REDUCTION",
    multiplier: 0.5,
  },
  {
    id: "perk-4",
    name: "Wall Street AI Insider",
    description: "Mendapatkan dividen bursa saham dua kali lipat (+100% yield).",
    cyberShardsCost: 20,
    isUnlocked: false,
    effectType: "STOCK_DIVIDEND",
    multiplier: 2.0,
  },
];

interface GameContextType {
  player: PlayerStats;
  businesses: BusinessUnit[];
  commodities: Commodity[];
  news: NewsHeadline[];
  upgradeBusiness: (businessId: string) => void;
  hireManager: (businessId: string) => void;
  clickTerminal: () => number;
  injectAngelCapital: () => void;
  resetGame: () => void;
  stocks: Stock[];
  portfolio: PortfolioHolding[];
  buyStock: (stockId: string, shares: number) => void;
  sellStock: (stockId: string, shares: number) => void;
  executeIPO: () => void;
  techNodes: TechNode[];
  researchTech: (techId: string) => void;
  // SPRINT 5: Mega M&A Corporate Raider
  targets: TargetCompany[];
  buyTargetShares: (targetId: string, percent: number) => void;
  hostileTakeover: (targetId: string) => void;
  // SPRINT 6: Endgame Prestige Ascension
  cyberShards: number;
  prestigePerks: PrestigePerk[];
  calculateAscensionGain: () => number;
  executePrestigeAscension: () => void;
  unlockPrestigePerk: (perkId: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [player, setPlayer] = useState<PlayerStats>({
    companyName: "Nusantara Cyber Holdings",
    cash: 500,
    netWorth: 1500,
    totalEarned: 500,
    revenuePerSecond: 15,
    operationalCostPerSecond: 2,
    clickMultiplier: 25,
    level: 1,
    title: "Start-up Founder",
    prestigeCount: 0,
    isIPOCompleted: false,
  });

  const [businesses, setBusinesses] = useState<BusinessUnit[]>(SEED_BUSINESSES);
  const [commodities] = useState<Commodity[]>(SEED_COMMODITIES);
  const [news] = useState<NewsHeadline[]>([
    { id: "news-1", timestamp: "10:00", title: "Permintaan Chip Global Melonjak 45%! Emiten Teknologi Menguat.", category: "TECH", impactMultiplier: 1.25, isBullish: true },
    { id: "news-2", timestamp: "11:30", title: "Jalur Kargo Terusan Terblokir! Harga Bahan Mentah Naik Sementara.", category: "GLOBAL", impactMultiplier: 1.15, isBullish: false },
    { id: "news-3", timestamp: "13:15", title: "Terobosan Riset Baterai Fusi! Saham Energi Hijau Meroket.", category: "MARKET", impactMultiplier: 1.3, isBullish: true },
  ]);

  const [stocks, setStocks] = useState<Stock[]>(SEED_STOCKS);
  const [portfolio, setPortfolio] = useState<PortfolioHolding[]>([
    { stockId: "stk-1", ticker: "CYBR", sharesOwned: 100, averageBuyPrice: 380, totalCost: 38000 },
  ]);
  const [techNodes, setTechNodes] = useState<TechNode[]>(SEED_TECH_NODES);
  const [targets, setTargets] = useState<TargetCompany[]>(SEED_TARGET_COMPANIES);
  const [cyberShards, setCyberShards] = useState<number>(0);
  const [prestigePerks, setPrestigePerks] = useState<PrestigePerk[]>(SEED_PRESTIGE_PERKS);

  // Load Saved Game
  useEffect(() => {
    const saved = localStorage.getItem("simucorp_save_v3");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.player) setPlayer(parsed.player);
        if (parsed.businesses) setBusinesses(parsed.businesses);
        if (parsed.stocks) setStocks(parsed.stocks);
        if (parsed.portfolio) setPortfolio(parsed.portfolio);
        if (parsed.techNodes) setTechNodes(parsed.techNodes);
        if (parsed.targets) setTargets(parsed.targets);
        if (parsed.cyberShards !== undefined) setCyberShards(parsed.cyberShards);
        if (parsed.prestigePerks) setPrestigePerks(parsed.prestigePerks);
      } catch (e) {}
    }
  }, []);

  // Save Game Loop
  useEffect(() => {
    const saveObj = {
      player,
      businesses,
      stocks,
      portfolio,
      techNodes,
      targets,
      cyberShards,
      prestigePerks,
    };
    localStorage.setItem("simucorp_save_v3", JSON.stringify(saveObj));
  }, [player, businesses, stocks, portfolio, techNodes, targets, cyberShards, prestigePerks]);

  // Main Economy Tick (1 Second Loop)
  useEffect(() => {
    const timer = setInterval(() => {
      // Tech Boosts
      const hasTier1Boost = techNodes.find((t) => t.id === "tech-1")?.isResearched;
      const hasZeroOpex = techNodes.find((t) => t.id === "tech-7")?.isResearched;
      const hasTier4Boost = techNodes.find((t) => t.id === "tech-6")?.isResearched;

      // M&A Synergy Multipliers
      let maMultiplier = 1;
      targets.forEach((t) => {
        if (t.isAcquired) maMultiplier *= t.synergyMultiplier;
      });

      // Prestige Perks Boost
      const perkRevBoost = prestigePerks.find((p) => p.id === "perk-1")?.isUnlocked ? 1.5 : 1.0;
      const perkOpexReduction = prestigePerks.find((p) => p.id === "perk-3")?.isUnlocked ? 0.5 : 1.0;

      let totalGrossRev = 0;
      let totalOpex = 0;

      businesses.forEach((b) => {
        if (b.level > 0) {
          let revMultiplier = 1;
          if (b.tier === 1 && hasTier1Boost) revMultiplier *= 2;
          if (b.tier === 4 && hasTier4Boost) revMultiplier *= 3;

          totalGrossRev += b.baseRevenuePerSec * b.level * revMultiplier * maMultiplier * perkRevBoost;
          if (!hasZeroOpex) {
            totalOpex += b.operationalCostPerSec * b.level * perkOpexReduction;
          }
        }
      });

      const netRev = Math.max(0, totalGrossRev - totalOpex);

      // Stock Market Fluctuation
      setStocks((prev) =>
        prev.map((s) => {
          const delta = (Math.random() * 0.08 - 0.038);
          const newPrice = Math.max(10, Math.round(s.currentPrice * (1 + delta)));
          const changePercent = Math.round(((newPrice - s.basePrice) / s.basePrice) * 1000) / 10;
          const newHistory = [...s.priceHistory.slice(-9), { time: new Date().toLocaleTimeString().slice(3, 8), price: newPrice }];
          return { ...s, currentPrice: newPrice, changePercent, priceHistory: newHistory };
        })
      );

      // Portfolio Total Value
      let portfolioVal = 0;
      portfolio.forEach((p) => {
        const stk = stocks.find((s) => s.id === p.stockId);
        if (stk) portfolioVal += p.sharesOwned * stk.currentPrice;
      });

      setPlayer((prev) => {
        const newCash = prev.cash + netRev;
        const newTotal = prev.totalEarned + netRev;
        const newNetWorth = newCash + portfolioVal + totalGrossRev * 12;

        let level = 1;
        let title = "Start-up Founder";
        if (newNetWorth > 5000000000) { level = 7; title = "Omni Galactic Overlord"; }
        else if (newNetWorth > 500000000) { level = 6; title = "Global Titan"; }
        else if (newNetWorth > 50000000) { level = 5; title = "Conglomerate Tycoon"; }
        else if (newNetWorth > 5000000) { level = 4; title = "Mega Venture Director"; }
        else if (newNetWorth > 500000) { level = 3; title = "Corporate Executive"; }
        else if (newNetWorth > 25000) { level = 2; title = "Serial Entrepreneur"; }

        return {
          ...prev,
          cash: newCash,
          totalEarned: newTotal,
          netWorth: newNetWorth,
          revenuePerSecond: totalGrossRev,
          operationalCostPerSecond: totalOpex,
          level,
          title,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [businesses, stocks, portfolio, techNodes, targets, prestigePerks]);

  const upgradeBusiness = (businessId: string) => {
    setBusinesses((prev) =>
      prev.map((b) => {
        if (b.id === businessId) {
          const upgradeCost = Math.round(b.baseCost * Math.pow(1.15, b.level));
          if (player.cash >= upgradeCost) {
            setPlayer((p) => ({ ...p, cash: p.cash - upgradeCost }));
            return { ...b, level: b.level + 1 };
          }
        }
        return b;
      })
    );
  };

  const hireManager = (businessId: string) => {
    setBusinesses((prev) =>
      prev.map((b) => {
        if (b.id === businessId && !b.managerHired) {
          if (player.cash >= b.managerCost) {
            setPlayer((p) => ({ ...p, cash: p.cash - b.managerCost }));
            return { ...b, managerHired: true };
          }
        }
        return b;
      })
    );
  };

  const clickTerminal = (): number => {
    const isCrit = Math.random() < 0.15;
    const perkClickBoost = prestigePerks.find((p) => p.id === "perk-2")?.isUnlocked ? 4.0 : 1.0;
    const baseClick = player.clickMultiplier * perkClickBoost;
    const earned = isCrit ? baseClick * 3 : baseClick;
    setPlayer((prev) => ({
      ...prev,
      cash: prev.cash + earned,
      totalEarned: prev.totalEarned + earned,
      netWorth: prev.netWorth + earned,
    }));
    return earned;
  };

  const injectAngelCapital = () => {
    setPlayer((prev) => ({
      ...prev,
      cash: prev.cash + 250000,
      totalEarned: prev.totalEarned + 250000,
    }));
  };

  const resetGame = () => {
    localStorage.removeItem("simucorp_save_v3");
    window.location.reload();
  };

  // Stock Market Actions
  const buyStock = (stockId: string, shares: number) => {
    const stk = stocks.find((s) => s.id === stockId);
    if (!stk) return;
    const cost = stk.currentPrice * shares;
    if (player.cash < cost) return;

    setPlayer((p) => ({ ...p, cash: p.cash - cost }));

    setPortfolio((prev) => {
      const existing = prev.find((item) => item.stockId === stockId);
      if (existing) {
        const newShares = existing.sharesOwned + shares;
        const newCost = existing.totalCost + cost;
        return prev.map((item) =>
          item.stockId === stockId
            ? { ...item, sharesOwned: newShares, totalCost: newCost, averageBuyPrice: Math.round(newCost / newShares) }
            : item
        );
      }
      return [
        ...prev,
        { stockId, ticker: stk.ticker, sharesOwned: shares, averageBuyPrice: stk.currentPrice, totalCost: cost },
      ];
    });
  };

  const sellStock = (stockId: string, shares: number) => {
    const holding = portfolio.find((p) => p.stockId === stockId);
    const stk = stocks.find((s) => s.id === stockId);
    if (!holding || !stk || holding.sharesOwned < shares) return;

    const proceeds = stk.currentPrice * shares;
    setPlayer((p) => ({ ...p, cash: p.cash + proceeds }));

    setPortfolio((prev) =>
      prev
        .map((item) => {
          if (item.stockId === stockId) {
            const remaining = item.sharesOwned - shares;
            if (remaining <= 0) return null;
            return { ...item, sharesOwned: remaining, totalCost: remaining * item.averageBuyPrice };
          }
          return item;
        })
        .filter((item): item is PortfolioHolding => item !== null)
    );
  };

  const executeIPO = () => {
    if (player.netWorth >= 5000000 && !player.isIPOCompleted) {
      setPlayer((p) => ({
        ...p,
        cash: p.cash + 10000000,
        isIPOCompleted: true,
        title: "Public Conglomerate Chairman",
      }));
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    }
  };

  const researchTech = (techId: string) => {
    const tech = techNodes.find((t) => t.id === techId);
    if (!tech || tech.isResearched || player.cash < tech.cost) return;

    setPlayer((p) => ({ ...p, cash: p.cash - tech.cost }));
    setTechNodes((prev) =>
      prev.map((t) => (t.id === techId ? { ...t, isResearched: true } : t))
    );

    if (techId === "tech-4") {
      setBusinesses((prev) => prev.map((b) => ({ ...b, managerHired: true })));
    }
  };

  // SPRINT 5: Mega M&A Corporate Raider Actions
  const buyTargetShares = (targetId: string, percent: number) => {
    const target = targets.find((t) => t.id === targetId);
    if (!target || target.isAcquired) return;

    const cost = Math.round((target.valuation * percent) / 100);
    if (player.cash < cost) return;

    const newProgress = Math.min(100, target.acquisitionProgress + percent);
    const isNowAcquired = newProgress >= 100;

    setPlayer((p) => ({ ...p, cash: p.cash - cost }));
    setTargets((prev) =>
      prev.map((t) =>
        t.id === targetId
          ? { ...t, acquisitionProgress: newProgress, isAcquired: isNowAcquired }
          : t
      )
    );

    if (isNowAcquired) {
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
    }
  };

  const hostileTakeover = (targetId: string) => {
    const target = targets.find((t) => t.id === targetId);
    if (!target || target.isAcquired) return;

    const remainingPercent = 100 - target.acquisitionProgress;
    const premiumCost = Math.round(((target.valuation * remainingPercent) / 100) * 1.25); // 25% hostile premium

    if (player.cash < premiumCost) return;

    setPlayer((p) => ({ ...p, cash: p.cash - premiumCost }));
    setTargets((prev) =>
      prev.map((t) =>
        t.id === targetId
          ? { ...t, acquisitionProgress: 100, isAcquired: true }
          : t
      )
    );

    confetti({ particleCount: 200, spread: 100, origin: { y: 0.4 } });
  };

  // SPRINT 6: Endgame Prestige Ascension Actions
  const calculateAscensionGain = (): number => {
    if (player.netWorth < 10000000) return 0;
    return Math.floor(Math.sqrt(player.netWorth / 1000000));
  };

  const executePrestigeAscension = () => {
    const shardsGained = calculateAscensionGain();
    if (shardsGained <= 0) return;

    confetti({ particleCount: 300, spread: 120, origin: { y: 0.5 } });

    setCyberShards((prev) => prev + shardsGained);

    // Reset economy but retain Prestige perks & Cyber Shards
    setPlayer((prev) => ({
      companyName: prev.companyName,
      cash: 1000,
      netWorth: 2500,
      totalEarned: 1000,
      revenuePerSecond: 15,
      operationalCostPerSecond: 2,
      clickMultiplier: 50,
      level: 1,
      title: `Ascended Titan (Prestige ${prev.prestigeCount + 1})`,
      prestigeCount: prev.prestigeCount + 1,
      isIPOCompleted: false,
    }));

    setBusinesses(SEED_BUSINESSES);
    setStocks(SEED_STOCKS);
    setPortfolio([]);
    setTechNodes(SEED_TECH_NODES);
    setTargets(SEED_TARGET_COMPANIES);
  };

  const unlockPrestigePerk = (perkId: string) => {
    const perk = prestigePerks.find((p) => p.id === perkId);
    if (!perk || perk.isUnlocked || cyberShards < perk.cyberShardsCost) return;

    setCyberShards((prev) => prev - perk.cyberShardsCost);
    setPrestigePerks((prev) =>
      prev.map((p) => (p.id === perkId ? { ...p, isUnlocked: true } : p))
    );

    confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 } });
  };

  return (
    <GameContext.Provider
      value={{
        player,
        businesses,
        commodities,
        news,
        upgradeBusiness,
        hireManager,
        clickTerminal,
        injectAngelCapital,
        resetGame,
        stocks,
        portfolio,
        buyStock,
        sellStock,
        executeIPO,
        techNodes,
        researchTech,
        targets,
        buyTargetShares,
        hostileTakeover,
        cyberShards,
        prestigePerks,
        calculateAscensionGain,
        executePrestigeAscension,
        unlockPrestigePerk,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within GameProvider");
  return context;
}
