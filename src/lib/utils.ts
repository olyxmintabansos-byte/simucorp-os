import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoney(amount: number): string {
  if (amount >= 1e12) {
    return `$${(amount / 1e12).toFixed(2)} Triliun`;
  }
  if (amount >= 1e9) {
    return `$${(amount / 1e9).toFixed(2)} Miliar`;
  }
  if (amount >= 1e6) {
    return `$${(amount / 1e6).toFixed(2)} Juta`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCompact(num: number): string {
  if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
  return num.toString();
}
