"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import EventNavbar from "@/components/EventNavbar";
import { INITIAL_BOOKINGS } from "@/lib/mock-data";
import { BookingTicket } from "@/lib/types";
import { 
  Ticket, QrCode, Calendar, MapPin, Download, 
  Share2, CheckCircle2, Clock, ShieldCheck, Sparkles 
} from "lucide-react";

export default function TicketsWalletPage() {
  const [tickets, setTickets] = useState<BookingTicket[]>(INITIAL_BOOKINGS);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("eventvibe_tickets");
      if (stored) {
        const parsed = JSON.parse(stored);
        setTickets([...parsed, ...INITIAL_BOOKINGS]);
      }
    } catch (e) {}
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleDownloadIcs = (ticket: BookingTicket) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//EventVibe//Pass//EN
BEGIN:VEVENT
SUMMARY:${ticket.eventTitle}
DESCRIPTION:Pass: ${ticket.tierName} (${ticket.qrPassCode})
LOCATION:${ticket.venue}, ${ticket.eventCity}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${ticket.eventTitle.slice(0, 20)}.ics`;
    a.click();
    triggerToast("Calendar event file (.ics) downloaded!");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <EventNavbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Digital Pass Wallet & QR Tickets
            </h1>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Show your cryptographic QR pass at event registration gates for immediate credential check-in.
            </p>
          </div>
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/30">
            {tickets.length} Registered Passes
          </span>
        </div>

        {/* Tickets Stream */}
        <div className="space-y-6">
          {tickets.map((t, idx) => (
            <motion.div
              key={t.id + idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="rounded-3xl bg-slate-900/80 border border-slate-800 overflow-hidden flex flex-col md:flex-row shadow-xl"
            >
              {/* Left Details */}
              <div className="p-6 sm:p-8 flex-1 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-violet-500/20 text-violet-300 border border-violet-500/40">
                    {t.tierName}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                    t.isScanned
                      ? "bg-slate-800 text-slate-400"
                      : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                  }`}>
                    {t.isScanned ? (
                      <>Admitted • Pass Scanned</>
                    ) : (
                      <>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Ready for Gate Check-in</span>
                      </>
                    )}
                  </span>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">{t.eventTitle}</h2>
                  <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-violet-400" />
                      {t.eventDate}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-violet-400" />
                      {t.venue}, {t.eventCity}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 text-[11px] block">Attendee</span>
                    <span className="font-semibold text-white">{t.customerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Quantity</span>
                    <span className="font-semibold text-white">{t.quantity} Pass(es)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Order Total</span>
                    <span className="font-mono font-bold text-emerald-400">${t.totalPrice}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => handleDownloadIcs(t)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Add to Calendar (.ics)</span>
                  </button>
                  <button
                    onClick={() => triggerToast("Added to Apple Wallet payload!")}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Apple Wallet Pass</span>
                  </button>
                </div>
              </div>

              {/* Right QR Stub */}
              <div className="p-6 sm:p-8 bg-slate-950/80 border-t md:border-t-0 md:border-l border-slate-800 flex flex-col items-center justify-center space-y-3 shrink-0 md:w-64">
                {/* Simulated QR Code Graphic */}
                <div className="p-4 rounded-2xl bg-white text-slate-950 flex flex-col items-center justify-center shadow-lg">
                  <QrCode className="w-28 h-28" />
                </div>
                <div className="text-center">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Pass Verification Code</span>
                  <span className="font-mono font-bold text-sm text-violet-400 tracking-wider">{t.qrPassCode}</span>
                </div>
              </div>
            </motion.div>
          ))}
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
