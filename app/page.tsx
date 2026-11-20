"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Ticket, Sparkles, Database, ArrowRight, CheckCircle2, 
  ChevronRight, Calendar, QrCode, CreditCard, ShieldCheck, 
  Zap, Users, MapPin, Calculator, ExternalLink, Activity 
} from "lucide-react";

export default function EventBookingLandingPage() {
  // Interactive Ticket Pricing Calculator
  const [selectedTier, setSelectedTier] = useState<"GA" | "VIP">("GA");
  const [ticketCount, setTicketCount] = useState(2);

  const basePrice = selectedTier === "GA" ? 299 : 799;
  const subtotal = basePrice * ticketCount;
  const groupDiscount = ticketCount >= 3 ? subtotal * 0.1 : 0;
  const finalTotal = subtotal - groupDiscount;

  // Pricing Toggle
  const [annualBilling, setAnnualBilling] = useState(true);

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does the digital QR pass system work at event gates?",
      a: "Every confirmed booking generates a cryptographically signed QR code pass linked to your Prisma database record. Event staff use our built-in /scanner workstation to verify passes in under 200ms with real-time fraud and duplicate entry protection."
    },
    {
      q: "Are Stripe payments processed securely?",
      a: "Yes! EventVibe integrates directly with Stripe Checkout and Stripe Connect, providing PCI-compliant processing, Apple Pay, Google Pay, and automatic payouts directly to event organizers."
    },
    {
      q: "Can attendees save passes to Apple Wallet or export calendar invites?",
      a: "Yes! The Pass Wallet at /tickets allows attendees to add passes to Apple Wallet or download standard .ics calendar invite files with full venue details and keynote agendas."
    },
    {
      q: "Is there a real-time revenue analytics dashboard for organizers?",
      a: "Yes, visit /analytics to view ticket sales velocity curves, tier sellout ratios, and gross Stripe settlement telemetry powered by Recharts."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-violet-500 selection:text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-violet-600 via-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-violet-500/20">
              <Ticket className="h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-white text-base tracking-tight">EventVibe</span>
              <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-mono bg-violet-500/10 text-violet-400 border border-violet-500/20">
                Stripe + Prisma
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
            <a href="#calculator" className="hover:text-white transition">Pass Calculator</a>
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#architecture" className="hover:text-white transition">Prisma Engine</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
            <a href="#faq" className="hover:text-white transition">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/events"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/30 transition hover:scale-105 active:scale-95"
            >
              <span>Explore Summits</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 space-y-24 sm:space-y-32 py-12">
        {/* HERO SECTION */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-medium">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span>Next-Generation Conference & Ticket Booking Engine</span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-tight sm:leading-[1.1]"
          >
            Discover Tech Summits. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Instant Stripe Booking & QR Gate Passes.
            </span>
          </motion.h1>

          <p className="text-slate-400 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            The complete event discovery and transactional ticketing platform. Engineered with Next.js 15, PostgreSQL Prisma relational schemas, Stripe checkout, and on-site laser check-in scanners.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/events"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm shadow-xl shadow-violet-600/30 transition hover:scale-105 active:scale-95"
            >
              <Calendar className="w-5 h-5" />
              <span>Browse Tech Conferences</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/tickets"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold text-sm transition"
            >
              <Ticket className="w-5 h-5 text-violet-400" />
              <span>Open Digital Wallet</span>
            </Link>
          </div>

          {/* Metrics ticker */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left">
            {[
              { val: "$482k+", label: "Gross Ticket Sales", sub: "Stripe processed" },
              { val: "1,555", label: "Registered Passes", sub: "Verified attendees" },
              { val: "< 200ms", label: "Gate QR Recall", sub: "Laser scanning" },
              { val: "100%", label: "Fraud Protection", sub: "Cryptographic passes" }
            ].map((stat, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80">
                <div className="text-2xl sm:text-3xl font-black text-white">{stat.val}</div>
                <div className="text-xs font-bold text-violet-400 mt-1">{stat.label}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* INTERACTIVE PASS PRICING & TIER CALCULATOR */}
        <section id="calculator" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-semibold">
              <Calculator className="w-3.5 h-3.5" />
              <span>Interactive Group Booking Calculator</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Estimate Pass Costs & Group Discounts</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Select between General Admission and VIP All-Access passes with automatic 10% team discounts applied for 3+ tickets.
            </p>
          </div>

          <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-2xl">
            {/* Tier Radio */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setSelectedTier("GA")}
                className={`p-5 rounded-2xl border cursor-pointer transition ${
                  selectedTier === "GA"
                    ? "bg-violet-600/15 border-violet-500 text-white shadow-lg shadow-violet-500/10"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm">General Admission Pass</span>
                  <span className="font-mono font-bold text-emerald-400 text-lg">$299</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Full 3-day conference access, keynote stages, and official attendee swag kit.
                </p>
              </div>

              <div
                onClick={() => setSelectedTier("VIP")}
                className={`p-5 rounded-2xl border cursor-pointer transition ${
                  selectedTier === "VIP"
                    ? "bg-violet-600/15 border-violet-500 text-white shadow-lg shadow-violet-500/10"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm">VIP All-Access & Speaker Dinner</span>
                  <span className="font-mono font-bold text-emerald-400 text-lg">$799</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Reserved front-row seating, private VIP lounge, and executive speaker dinner invitation.
                </p>
              </div>
            </div>

            {/* Quantity Slider */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-semibold">Number of Team Attendees</span>
                <span className="font-mono font-bold text-white text-sm">{ticketCount} Passes</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={ticketCount}
                onChange={(e) => setTicketCount(Number(e.target.value))}
                className="w-full accent-violet-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>1 Pass</span>
                <span>5 Passes</span>
                <span>10 Passes (Enterprise Pack)</span>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal ({ticketCount} × ${basePrice})</span>
                <span className="font-mono">${subtotal.toLocaleString()}</span>
              </div>
              {groupDiscount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Group Discount (10% off 3+ passes)</span>
                  <span className="font-mono">-${groupDiscount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between items-baseline pt-2 border-t border-slate-800/80">
                <span className="font-bold text-white text-sm">Estimated Total</span>
                <span className="text-3xl font-black text-white font-mono">${finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <Link
              href="/events"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-lg shadow-violet-600/30 transition hover:scale-105 active:scale-95"
            >
              <span>Proceed to Select Conference & Check out with Stripe</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* WORKSPACE MODULES */}
        <section id="features" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Full-Cycle Event Infrastructure</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              A complete system from attendee discovery to on-site registration gate verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Calendar,
                title: "Global Summit Catalog",
                desc: "Discover multi-day conferences across AI, cloud systems, and full-stack architecture.",
                href: "/events",
                action: "Browse Summits"
              },
              {
                icon: Ticket,
                title: "Digital Pass Wallet",
                desc: "Cryptographic QR code tickets with Apple Wallet export and calendar sync (.ics).",
                href: "/tickets",
                action: "View Passes"
              },
              {
                icon: QrCode,
                title: "Gate Laser Scanner",
                desc: "Real-time organizer check-in console with sub-200ms pass verification.",
                href: "/scanner",
                action: "Test Scanner"
              },
              {
                icon: Activity,
                title: "Sales & Revenue Analytics",
                desc: "Monitor ticket velocity, tier sellout curves, and gross Stripe settlements.",
                href: "/analytics",
                action: "View Analytics"
              }
            ].map((f, idx) => {
              const Icon = f.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-violet-500/50 transition">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-white text-base mt-4">{f.title}</h3>
                    <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">{f.desc}</p>
                  </div>

                  <Link
                    href={f.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-400 hover:text-violet-300 pt-2"
                  >
                    <span>{f.action}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* PRICING MATRIX */}
        <section id="pricing" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Organizer Platform Plans</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Transparent fees for local meetups to multi-thousand attendee international summits.
            </p>

            <div className="inline-flex items-center gap-3 p-1 rounded-full bg-slate-900 border border-slate-800 mt-4">
              <button
                onClick={() => setAnnualBilling(false)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${!annualBilling ? "bg-violet-600 text-white" : "text-slate-400"}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnualBilling(true)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${annualBilling ? "bg-violet-600 text-white" : "text-slate-400"}`}
              >
                Annual (Save 20%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Community Organizer",
                price: "$0",
                period: "forever free",
                features: [
                  "Up to 250 attendees per event",
                  "Stripe Checkout processing",
                  "Instant digital QR code passes",
                  "Standard gate scanner access"
                ],
                popular: false,
                btn: "Start Free",
                href: "/events"
              },
              {
                name: "Summit Professional",
                price: annualBilling ? "$49" : "$59",
                period: "per event month",
                features: [
                  "Up to 2,500 attendees per event",
                  "Multi-tier ticket capacity pools",
                  "Real-time ticket velocity analytics",
                  "Custom branded QR passes",
                  "Apple Wallet pass generation"
                ],
                popular: true,
                btn: "Host Summit",
                href: "/events"
              },
              {
                name: "Enterprise Stadium",
                price: annualBilling ? "$149" : "$180",
                period: "per event month",
                features: [
                  "Unlimited global summit capacity",
                  "Dedicated multi-gate laser scan sync",
                  "Custom Stripe Connect fee splits",
                  "SSO SAML registration gates",
                  "Dedicated on-site technical engineer"
                ],
                popular: false,
                btn: "Contact Enterprise",
                href: "/events"
              }
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-3xl border flex flex-col justify-between space-y-6 transition ${
                  plan.popular
                    ? "bg-slate-900 border-violet-500 shadow-2xl shadow-violet-500/10 scale-105"
                    : "bg-slate-900/50 border-slate-800"
                }`}
              >
                <div>
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-white text-lg">{plan.name}</h3>
                    {plan.popular && (
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-violet-500/20 text-violet-300 border border-violet-500/40">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-xs text-slate-400">/{plan.period}</span>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-center gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={plan.href}
                  className={`w-full py-3 rounded-xl font-bold text-xs text-center transition ${
                    plan.popular
                      ? "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/30"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                  }`}
                >
                  {plan.btn}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-sm">Everything you need to know about EventVibe ticketing and gate check-in.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-800 rounded-2xl bg-slate-900/50 overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-white hover:text-violet-400 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? "rotate-90 text-violet-400" : ""}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-violet-950/60 via-slate-900 to-purple-950/60 border border-violet-500/30 text-center space-y-6 shadow-2xl">
            <h2 className="text-3xl sm:text-5xl font-black text-white max-w-2xl mx-auto leading-tight">
              Ready to Attend the Next Flagship Summit?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
              Secure your pass in seconds and enjoy seamless entry with instant QR validation.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/events"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm shadow-xl shadow-violet-600/30 transition hover:scale-105"
              >
                Explore Upcoming Summits
              </Link>
              <Link
                href="/tickets"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 font-semibold text-sm transition"
              >
                Access My Tickets
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-violet-600 flex items-center justify-center text-white">
              <Ticket className="h-4 w-4" />
            </div>
            <span className="font-bold text-white text-sm">EventVibe</span>
            <span>• Next.js 15 & PostgreSQL Ticketing Engine</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/events" className="hover:text-slate-300 transition">Summits</Link>
            <Link href="/tickets" className="hover:text-slate-300 transition">Pass Wallet</Link>
            <Link href="/scanner" className="hover:text-slate-300 transition">Gate Scanner</Link>
            <Link href="/analytics" className="hover:text-slate-300 transition">Analytics</Link>
            <Link href="/settings" className="hover:text-slate-300 transition">Settings</Link>
            <a href="https://github.com/manthanank/event-booking-platform" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition flex items-center gap-1">
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div>
            © {new Date().getFullYear()} EventVibe Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

