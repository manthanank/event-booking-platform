import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://event-booking-platform-manthan.vercel.app"),
  title: "EventVibe • Global Tech Conferences & Ticket Booking",
  description: "Enterprise event ticketing platform with Stripe payments, instant QR code passes, and organizer gate validation powered by Next.js 15 and PostgreSQL.",
  keywords: ["events", "conferences", "ticketing", "stripe", "qr code", "nextjs", "prisma"],
  openGraph: {
    title: "EventVibe Enterprise",
    description: "Enterprise event booking and QR gate validation platform.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-violet-500 selection:text-white">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
