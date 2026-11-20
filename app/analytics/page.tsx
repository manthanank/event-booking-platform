"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import EventNavbar from "@/components/EventNavbar";
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, 
  Tooltip, ResponsiveContainer, Cell 
} from "recharts";
import { 
  BarChart2, ArrowUpRight, DollarSign, Ticket, 
  Users, CheckCircle2, QrCode, TrendingUp 
} from "lucide-react";

export default function AnalyticsPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const ticketVelocityData = [
    { week: "W1", revenue: 42000, passes: 140 },
    { week: "W2", revenue: 86000, passes: 280 },
    { week: "W3", revenue: 148000, passes: 490 },
    { week: "W4", revenue: 215000, passes: 720 },
    { week: "W5", revenue: 340000, passes: 1140 },
    { week: "W6", revenue: 482400, passes: 1555 },
  ];

  const tierRevenueData = [
    { tier: "General Admission", revenue: 281000, fill: "#8b5cf6" },
    { tier: "VIP All-Access", revenue: 171785, fill: "#ec4899" },
    { tier: "Early Bird", revenue: 79600, fill: "#10b981" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <EventNavbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Ticketing Revenue & Gate Sellout Analytics
            </h1>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-time ticket tier velocity, Stripe payment gross, and on-site gate check-in ratios.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>94.2% Total Capacity Reserved</span>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Gross Ticket Revenue", val: "$482,400", change: "+38.4%", sub: "via Stripe" },
            { label: "Total Passes Issued", val: "1,555", change: "+120 today", sub: "Moscone Summit" },
            { label: "Gate Attendance Rate", val: "88.6%", change: "+4.2%", sub: "Scanned passes" },
            { label: "VIP Tier Sellout", val: "86.0%", change: "35 passes left", sub: "Speaker dinner" }
          ].map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800"
            >
              <div className="text-xs font-semibold text-slate-400">{item.label}</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5">{item.val}</div>
              <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-emerald-400">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>{item.change}</span>
                <span className="text-slate-500 text-[11px] font-normal">({item.sub})</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Revenue Velocity Curve */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-white">Cumulative Ticket Revenue Velocity ($ USD)</h3>
              <p className="text-xs text-slate-400">Growth curve from initial Early Bird drop to final keynote week</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-violet-400">
                <span className="w-2.5 h-2.5 rounded bg-violet-500" /> Revenue Gross
              </span>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ticketVelocityData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="week" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", color: "#fff" }}
                    formatter={(val) => [`$${Number(val).toLocaleString()}`, "Gross Revenue"]}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#revGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Tier Revenue Breakdown Bar */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">Gross Revenue by Ticket Tier ($ USD)</h3>
            <p className="text-xs text-slate-400">Comparative revenue contribution between pass tiers</p>
          </div>

          <div className="h-64 w-full pt-4">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tierRevenueData} layout="vertical" margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
                  <XAxis type="number" stroke="#64748b" fontSize={11} />
                  <YAxis dataKey="tier" type="category" stroke="#94a3b8" fontSize={12} width={140} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", color: "#fff" }}
                    formatter={(val) => [`$${Number(val).toLocaleString()}`, "Gross Contribution"]}
                  />
                  <Bar dataKey="revenue" radius={[0, 8, 8, 0]}>
                    {tierRevenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
