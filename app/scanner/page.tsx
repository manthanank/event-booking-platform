"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import EventNavbar from "@/components/EventNavbar";
import { 
  QrCode, CheckCircle2, AlertTriangle, Scan, 
  Users, ShieldCheck, Clock, ArrowRight, RefreshCw 
} from "lucide-react";

interface ScanRecord {
  id: string;
  passCode: string;
  attendee: string;
  tier: string;
  status: "ADMITTED" | "ALREADY_SCANNED" | "INVALID";
  timestamp: string;
}

export default function GateScannerPage() {
  const [passInput, setPassInput] = useState("EVT-VIP-98421");
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanResult, setLastScanResult] = useState<ScanRecord | null>({
    id: "rec-1",
    passCode: "EVT-VIP-98421",
    attendee: "Alex Vance",
    tier: "VIP All-Access & Speaker Dinner",
    status: "ADMITTED",
    timestamp: "10:14 AM",
  });

  const [scanHistory, setScanHistory] = useState<ScanRecord[]>([
    {
      id: "rec-1",
      passCode: "EVT-VIP-98421",
      attendee: "Alex Vance",
      tier: "VIP All-Access & Speaker Dinner",
      status: "ADMITTED",
      timestamp: "10:14 AM",
    },
    {
      id: "rec-2",
      passCode: "EVT-GA-44109",
      attendee: "Sarah Jenkins",
      tier: "Standard Engineer Pass",
      status: "ALREADY_SCANNED",
      timestamp: "10:12 AM",
    },
    {
      id: "rec-3",
      passCode: "EVT-GA-19402",
      attendee: "Marcus Chen",
      tier: "General Admission",
      status: "ADMITTED",
      timestamp: "10:08 AM",
    },
  ]);

  const handleSimulateScan = (codeToScan?: string) => {
    const code = codeToScan || passInput;
    if (!code) return;

    setIsScanning(true);
    setTimeout(() => {
      let result: ScanRecord;

      if (code === "EVT-VIP-98421") {
        result = {
          id: `scan-${Date.now()}`,
          passCode: code,
          attendee: "Alex Vance",
          tier: "VIP All-Access & Speaker Dinner",
          status: "ADMITTED",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
      } else if (code.startsWith("EVT-GA")) {
        result = {
          id: `scan-${Date.now()}`,
          passCode: code,
          attendee: "Developer Attendee",
          tier: "General Admission Pass",
          status: "ADMITTED",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
      } else {
        result = {
          id: `scan-${Date.now()}`,
          passCode: code,
          attendee: "Unknown Attendee",
          tier: "Unrecognized Pass",
          status: "INVALID",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
      }

      setLastScanResult(result);
      setScanHistory([result, ...scanHistory]);
      setIsScanning(false);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <EventNavbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Gate Check-in & QR Laser Scanner
            </h1>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Instant credential validation for event security personnel and registration desks.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Gate Scanner Station 04 • Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Laser Scanner Viewport (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
              {/* Camera Scanner Viewport */}
              <div className="relative h-72 sm:h-80 w-full rounded-2xl bg-slate-950 border-2 border-dashed border-violet-500/40 flex flex-col items-center justify-center overflow-hidden">
                {/* Crosshairs */}
                <div className="absolute inset-8 border-2 border-violet-500/60 rounded-2xl pointer-events-none" />

                {/* Animated Laser Sweep */}
                {isScanning && (
                  <motion.div
                    initial={{ top: "10%" }}
                    animate={{ top: "90%" }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                    className="absolute left-8 right-8 h-1 bg-gradient-to-r from-violet-500 via-pink-500 to-violet-500 shadow-lg shadow-pink-500/50"
                  />
                )}

                <div className="text-center space-y-3 z-10 p-4">
                  <div className="w-16 h-16 rounded-2xl bg-violet-600/20 text-violet-400 flex items-center justify-center mx-auto border border-violet-500/30">
                    <QrCode className="w-8 h-8" />
                  </div>
                  <p className="text-xs text-slate-400">
                    Align attendee digital pass QR code inside the viewfinder
                  </p>
                </div>
              </div>

              {/* Pass Code Manual Trigger */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  placeholder="Enter QR pass code (e.g. EVT-VIP-98421)..."
                  value={passInput}
                  onChange={(e) => setPassInput(e.target.value)}
                  className="w-full flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-violet-500"
                />
                <button
                  onClick={() => handleSimulateScan()}
                  disabled={isScanning}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/30 transition disabled:opacity-50 cursor-pointer"
                >
                  {isScanning ? "Scanning Pass..." : "Simulate Laser Scan"}
                </button>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-semibold">Test Presets:</span>
                <button
                  onClick={() => handleSimulateScan("EVT-VIP-98421")}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 text-violet-300 hover:text-white"
                >
                  Valid VIP
                </button>
                <button
                  onClick={() => handleSimulateScan("EVT-GA-44109")}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 text-amber-300 hover:text-white"
                >
                  Already Scanned
                </button>
                <button
                  onClick={() => handleSimulateScan("EVT-INVALID-000")}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 text-rose-300 hover:text-white"
                >
                  Invalid Code
                </button>
              </div>
            </div>

            {/* Last Scan Outcome Card */}
            {lastScanResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-3xl border ${
                  lastScanResult.status === "ADMITTED"
                    ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-300"
                    : lastScanResult.status === "ALREADY_SCANNED"
                    ? "bg-amber-950/20 border-amber-500/40 text-amber-300"
                    : "bg-rose-950/20 border-rose-500/40 text-rose-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  {lastScanResult.status === "ADMITTED" ? (
                    <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-7 h-7 text-amber-400 shrink-0" />
                  )}
                  <div>
                    <h3 className="font-extrabold text-white text-base">
                      {lastScanResult.status === "ADMITTED"
                        ? "ADMISSION GRANTED • WELCOME"
                        : lastScanResult.status === "ALREADY_SCANNED"
                        ? "WARNING: PASS ALREADY ADMITTED"
                        : "ACCESS DENIED: INVALID PASS CODE"}
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {lastScanResult.attendee} • {lastScanResult.tier} ({lastScanResult.passCode})
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Gate Scan Activity Feed (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Recent Check-in Logs ({scanHistory.length})
            </h2>

            <div className="space-y-3">
              {scanHistory.map((rec) => (
                <div
                  key={rec.id}
                  className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-white">{rec.attendee}</div>
                    <span className="text-[11px] text-slate-400 block mt-0.5 font-mono">{rec.passCode}</span>
                  </div>

                  <div className="text-right space-y-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      rec.status === "ADMITTED"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}>
                      {rec.status}
                    </span>
                    <span className="text-[10px] text-slate-500 block">{rec.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

