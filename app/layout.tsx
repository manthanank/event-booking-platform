import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://event-booking-platform-ruddy.vercel.app"),
  title: "EventVibe • Global Tech Conferences & Ticket Booking",
  description:
    "Enterprise event ticketing platform with Stripe payments, instant QR code passes, and organizer gate validation powered by Next.js 15 and PostgreSQL.",
  keywords: ["events", "conferences", "ticketing", "stripe", "qr code", "nextjs", "prisma"],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "EventVibe Enterprise",
    description: "Enterprise event booking and QR gate validation platform.",
    type: "website",
    url: "https://event-booking-platform-ruddy.vercel.app",
    siteName: "EventVibe",
  },
  twitter: {
    card: "summary_large_image",
    title: "EventVibe • Global Tech Conferences & Ticket Booking",
    description: "Digital ticket wallet, QR code scanners, and Stripe payments.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "EventVibe Event Booking Platform",
    applicationCategory: "EventApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: "Manthan Ank",
      url: "https://github.com/manthanank",
    },
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-violet-500 selection:text-white">
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
