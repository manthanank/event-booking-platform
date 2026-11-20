"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import EventNavbar from "@/components/EventNavbar";
import { INITIAL_EVENTS } from "@/lib/mock-data";
import { EventItem, TicketTier } from "@/lib/types";
import { 
  Calendar, MapPin, Clock, Users, Ticket, 
  Search, Filter, CheckCircle2, ArrowRight, X, Shield 
} from "lucide-react";

export default function EventsCatalogPage() {
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [bookingEvent, setBookingEvent] = useState<EventItem | null>(null);
  const [selectedTier, setSelectedTier] = useState<TicketTier | null>(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  const categories = ["All", "Full-Stack Dev", "AI & ML Summit", "Cloud & DevOps"];

  const filteredEvents = events.filter((e) => {
    const matchesSearch = 
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.city.toLowerCase().includes(search.toLowerCase()) ||
      e.venue.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || e.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenBooking = (event: EventItem) => {
    setBookingEvent(event);
    setSelectedTier(event.tiers[0]);
    setTicketQuantity(1);
    setBookingSuccess(null);
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingEvent || !selectedTier) return;

    setIsProcessing(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: bookingEvent.id,
          tierId: selectedTier.id,
          quantity: ticketQuantity,
          customerName: "Alex Vance",
          customerEmail: "alex.vance@eventvibe.io",
        }),
      });

      const data = await res.json();
      setBookingSuccess(data.qrPassCode);

      // Save to localStorage
      const newPass = {
        id: `bkg-${Date.now()}`,
        eventId: bookingEvent.id,
        eventTitle: bookingEvent.title,
        eventDate: bookingEvent.date,
        eventCity: bookingEvent.city,
        venue: bookingEvent.venue,
        tierName: selectedTier.name,
        customerName: "Alex Vance",
        customerEmail: "alex.vance@eventvibe.io",
        quantity: ticketQuantity,
        totalPrice: selectedTier.price * ticketQuantity,
        qrPassCode: data.qrPassCode,
        isScanned: false,
        bookedAt: "Just now",
      };

      const stored = localStorage.getItem("eventvibe_tickets");
      const list = stored ? JSON.parse(stored) : [];
      localStorage.setItem("eventvibe_tickets", JSON.stringify([newPass, ...list]));
    } catch (err) {
      alert("Payment processing error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <EventNavbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Global Technology Summits & Conferences
            </h1>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Secure verified digital passes with instant QR access and Apple Wallet integration.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-semibold">
            <Ticket className="w-4 h-4 text-violet-400" />
            <span>Instant Stripe Card & Apple Pay Checkout</span>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by conference name, city, or venue..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? "bg-violet-600/20 border border-violet-500/40 text-violet-300 shadow-md shadow-violet-500/10"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt, idx) => (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              className="rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition overflow-hidden flex flex-col justify-between"
            >
              {/* Event Header Card */}
              <div className={`p-6 bg-gradient-to-br ${evt.bannerGradient} text-white relative`}>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/40 backdrop-blur-md border border-white/20">
                  {evt.category}
                </span>
                <h3 className="font-extrabold text-white text-lg mt-3 leading-snug">{evt.title}</h3>
                <div className="mt-4 flex items-center gap-4 text-xs text-white/80">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {evt.date}
                  </span>
                </div>
              </div>

              {/* Details Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-xs text-slate-400">
                    <MapPin className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                    <span>{evt.venue}, {evt.city}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {evt.description}
                  </p>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span>{evt.speakersCount} Keynote Speakers</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      From ${Math.min(...evt.tiers.map(t => t.price))}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <button
                    onClick={() => handleOpenBooking(evt)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/25 transition cursor-pointer"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Select Ticket Tiers</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Booking Checkout Modal */}
      {bookingEvent && selectedTier && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-violet-400 uppercase tracking-wider">
                  {bookingEvent.category}
                </span>
                <h2 className="text-lg font-bold text-white mt-1">{bookingEvent.title}</h2>
              </div>
              <button
                onClick={() => setBookingEvent(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Pass Confirmed & Issued!</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Your digital pass has been generated with code:{" "}
                    <strong className="text-emerald-400 font-mono">{bookingSuccess}</strong>
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-center gap-3">
                  <a
                    href="/tickets"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition"
                  >
                    View in Digital Wallet
                  </a>
                  <button
                    onClick={() => setBookingEvent(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-5">
                {/* Tier Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 block">Select Ticket Tier</label>
                  <div className="space-y-2">
                    {bookingEvent.tiers.map((tier) => (
                      <div
                        key={tier.id}
                        onClick={() => setSelectedTier(tier)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                          selectedTier.id === tier.id
                            ? "bg-violet-600/15 border-violet-500 text-white"
                            : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs">{tier.name}</span>
                          <span className="font-mono font-bold text-sm text-emerald-400">${tier.price}</span>
                        </div>
                        <ul className="mt-2 space-y-1 text-[11px] text-slate-400 list-disc list-inside">
                          {tier.perks.slice(0, 2).map((p, pidx) => (
                            <li key={pidx}>{p}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
                  <span className="text-slate-300 font-semibold">Number of Passes</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                      className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold"
                    >
                      -
                    </button>
                    <span className="font-mono font-bold text-sm text-white">{ticketQuantity}</span>
                    <button
                      type="button"
                      onClick={() => setTicketQuantity(ticketQuantity + 1)}
                      className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 block">Total Due (via Stripe)</span>
                    <span className="text-2xl font-black text-white">
                      ${selectedTier.price * ticketQuantity}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/30 transition disabled:opacity-50"
                  >
                    <span>{isProcessing ? "Processing Stripe Charge..." : "Pay with Card / Apple Pay"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
