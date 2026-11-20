"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import EventNavbar from "@/components/EventNavbar";
import { 
  CreditCard, Database, Download, RefreshCw, CheckCircle2, 
  ShieldCheck, Server, Code2 
} from "lucide-react";

export default function SettingsPage() {
  const [stripeAccountId, setStripeAccountId] = useState("acct_1N92xL4091vQ81a");
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleExportData = () => {
    const backup = {
      exportedAt: new Date().toISOString(),
      platform: "EventVibe Ticketing Platform v2.0",
      payoutConfig: {
        stripeAccountId,
        currency: "USD",
        payoutSchedule: "Daily Automated (Rolling 2-day)",
      },
      schema: "Prisma PostgreSQL Event & Booking Model",
      sampleMetrics: {
        totalEvents: 3,
        totalBookings: 1555,
        grossVolumeCents: 48240000,
      },
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `eventvibe-registry-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    triggerToast("Full attendee & ticket registry exported as JSON!");
  };

  const prismaSchemaCode = `model Event {
  id          String        @id @default(uuid())
  title       String
  slug        String        @unique
  category    String
  city        String
  venue       String
  startDate   DateTime
  tiers       TicketTier[]
  bookings    Booking[]
}

model TicketTier {
  id          String         @id @default(uuid())
  eventId     String
  event       Event          @relation(fields: [eventId], references: [id])
  name        String
  priceInCents Int
  capacity    Int
  soldCount   Int            @default(0)
  bookings    Booking[]
}

model Booking {
  id              String        @id @default(uuid())
  eventId         String
  event           Event         @relation(fields: [eventId], references: [id])
  tierId          String
  tier            TicketTier    @relation(fields: [tierId], references: [id])
  customerEmail   String
  totalPriceCents Int
  stripeSessionId String?       @unique
  qrPassCode      String        @unique
  isScanned       Boolean       @default(false)
}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <EventNavbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Stripe Connect & Database Schema
          </h1>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">
            Configure organizer merchant payouts, inspect relational Prisma ORM models, and export ticket ledgers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stripe Merchant Config */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Stripe Connect Merchant Configuration</h2>
                  <p className="text-xs text-slate-400">Direct settlement for ticket gross payouts</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Stripe Connected Account ID</label>
                  <input
                    type="text"
                    value={stripeAccountId}
                    onChange={(e) => setStripeAccountId(e.target.value)}
                    className="w-full mt-1.5 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-mono text-slate-200 focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-emerald-200 leading-relaxed">
                    <strong>Payout Status: Fully Verified & Operational</strong>
                    <p className="text-emerald-300/80 mt-0.5">
                      Daily rolling 2-day payouts enabled to Silicon Valley Bank • Account ending in 4102.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => triggerToast("Stripe account configuration saved!")}
                    className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md shadow-violet-600/20 transition"
                  >
                    Save Payout Settings
                  </button>
                </div>
              </div>
            </div>

            {/* Prisma Schema Viewer */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">PostgreSQL Prisma Relational Models</h2>
                    <p className="text-xs text-slate-400">Strictly typed schemas for Events, Tiers, and QR Passes</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  schema.prisma
                </span>
              </div>

              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-violet-300 overflow-x-auto leading-relaxed">
                {prismaSchemaCode}
              </pre>
            </div>
          </div>

          {/* Right Column: Data Portability */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Attendee & Ticket Export</h3>
                  <p className="text-xs text-slate-400">Download complete ticketing data</p>
                </div>
              </div>

              <button
                onClick={handleExportData}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-lg shadow-emerald-500/20"
              >
                <Download className="w-4 h-4" /> Download Complete JSON Archive
              </button>

              <button
                onClick={() => triggerToast("Sample event bookings restored to default state!")}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset Default Event Bookings
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Architecture Summary</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                  <span>Payments</span>
                  <span className="font-mono text-emerald-400">Stripe Checkout / Webhooks</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                  <span>Database</span>
                  <span className="font-mono text-violet-400">PostgreSQL + Prisma ORM</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                  <span>Gate Scanner</span>
                  <span className="font-mono text-violet-400">Deterministic QR Verification</span>
                </div>
                <div className="flex justify-between py-1.5 text-slate-300">
                  <span>Analytics</span>
                  <span className="font-mono text-violet-400">Vercel Analytics & Speed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-violet-500/40 text-violet-300 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3"
        >
          <CheckCircle2 className="w-4 h-4 text-violet-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </motion.div>
      )}
    </div>
  );
}
