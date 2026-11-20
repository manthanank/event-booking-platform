"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Ticket,
  Calendar,
  QrCode,
  BarChart2,
  Settings,
  Layers,
  Sparkles,
  Zap,
  Menu,
  X,
  ExternalLink,
  CreditCard,
  Database,
} from "lucide-react";

export function EventNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Overview", href: "/", icon: Layers },
    { label: "Discover Events", href: "/events", icon: Calendar },
    { label: "Pass Wallet", href: "/tickets", icon: Ticket },
    { label: "Gate Scanner", href: "/scanner", icon: QrCode },
    { label: "Sales Analytics", href: "/analytics", icon: BarChart2 },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-violet-600 via-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-violet-500/20 group-hover:scale-105 transition-transform">
              <Ticket className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-white text-base tracking-tight flex items-center gap-2">
                <span>EventVibe</span>
                <span className="hidden xl:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-violet-500/10 text-violet-400 border border-violet-500/20">
                  <Database className="h-3 w-3" />
                  <span>Stripe + Prisma</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Global Tech Summits & QR Pass Verification</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 border-l border-slate-800 pl-6">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? "bg-violet-600/15 text-violet-300 border border-violet-500/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Desktop Status & Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900/60 text-xs font-mono">
            <CreditCard className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-slate-400">Stripe:</span>
            <span className="text-emerald-400 font-bold">Connected</span>
          </div>

          <Link
            href="/events"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md shadow-violet-600/25 transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <Calendar className="h-4 w-4" />
            <span>Book Tickets</span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/events"
            className="p-2 rounded-xl bg-violet-600 text-white shadow-sm"
            aria-label="Events"
          >
            <Calendar className="h-5 w-5" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950 px-4 py-3 space-y-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-violet-600/20 text-violet-300 font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="pt-3 border-t border-slate-800/80 space-y-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-mono text-slate-400"
            >
              <span>Back to Public Product Tour</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default EventNavbar;

