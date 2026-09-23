export type BusinessTier = 1 | 2 | 3 | 4;

export interface BusinessUnit {
  id: string;
  name: string;
  tier: BusinessTier;
  category: "Ritel" | "Manufaktur" | "Teknologi" | "Konglomerat";
  level: number;
  baseCost: number;
  baseRevenuePerSec: number;
  operationalCostPerSec: number;
  iconType: "coffee" | "shop" | "factory" | "server" | "plane" | "energy";
  colorGradient: string;
  isUnlocked: boolean;
  managerHired: boolean;
  managerCost: number;
}

export interface Commodity {
  id: string;
  name: string;
  symbol: string;
  unit: string;
  currentPrice: number;
  basePrice: number;
  priceHistory: number[];
  trend: "UP" | "DOWN" | "STABLE";
  inventoryOwned: number;
}

export interface NewsHeadline {
  id: string;
  timestamp: string;
  title: string;
  category: "MARKET" | "TECH" | "GLOBAL" | "SCANDAL";
  impactMultiplier: number;
  isBullish: boolean;
}

export interface PlayerStats {
  companyName: string;
  cash: number;
  netWorth: number;
  totalEarned: number;
  revenuePerSecond: number;
  operationalCostPerSecond: number;
  clickMultiplier: number;
  level: number;
  title: string;
  prestigeCount: number;
  isIPOCompleted: boolean;
}

export interface Stock {
  id: string;
  ticker: string;
  name: string;
  sector: string;
  currentPrice: number;
  basePrice: number;
  changePercent: number;
  dividendYield: number;
  priceHistory: { time: string; price: number }[];
  color: string;
}

export interface PortfolioHolding {
  stockId: string;
  ticker: string;
  sharesOwned: number;
  averageBuyPrice: number;
  totalCost: number;
}

export interface TechNode {
  id: string;
  name: string;
  branch: "Automation" | "Quantum" | "Logistics" | "Energy";
  description: string;
  cost: number;
  isResearched: boolean;
  multiplierText: string;
  iconType: "zap" | "cpu" | "server" | "flame";
}

// SPRINT 5: Mega M&A Corporate Raider
export interface TargetCompany {
  id: string;
  name: string;
  ticker: string;
  valuation: number;
  marketShare: number; // e.g. 15%
  acquisitionProgress: number; // 0 to 100%
  synergyMultiplier: number; // e.g. 1.25x revenue boost
  isAcquired: boolean;
  industry: string;
  description: string;
  defenseTactic: string;
}

// SPRINT 6: Endgame Prestige Ascension
export interface PrestigePerk {
  id: string;
  name: string;
  description: string;
  cyberShardsCost: number;
  isUnlocked: boolean;
  effectType: "REVENUE_BOOST" | "CLICK_BOOST" | "OPEX_REDUCTION" | "STOCK_DIVIDEND";
  multiplier: number;
}
