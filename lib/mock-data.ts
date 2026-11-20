import { EventItem, BookingTicket } from "./types";

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: "evt-nextjs-summit",
    title: "Global Next.js & React 19 Architecture Summit 2026",
    slug: "nextjs-summit-2026",
    description: "The definitive global summit on Next.js 15 App Router, React Server Components, Edge Middleware, and Turbopack production performance.",
    category: "Full-Stack Dev",
    city: "San Francisco, CA",
    venue: "Moscone West Center, Hall D",
    date: "October 14-16, 2026",
    time: "09:00 AM - 06:00 PM PST",
    bannerGradient: "from-blue-600 via-indigo-600 to-violet-800",
    speakersCount: 32,
    featured: true,
    tiers: [
      {
        id: "tier-ga-1",
        name: "General Admission",
        tierType: "GENERAL_ADMISSION",
        price: 299,
        capacity: 1200,
        soldCount: 940,
        perks: [
          "Access to 3 conference stages",
          "Expo hall & demo stations",
          "Lunch & barista coffee included",
          "Official 2026 attendee swag kit"
        ],
      },
      {
        id: "tier-vip-1",
        name: "VIP All-Access & Speaker Dinner",
        tierType: "VIP_ALL_ACCESS",
        price: 799,
        capacity: 250,
        soldCount: 215,
        perks: [
          "Everything in General Admission",
          "Reserved front-row keynote seating",
          "Private VIP Lounge & High-speed workspace",
          "Exclusive Speaker & Executive Dinner access",
          "Hands-on Masterclass workshops"
        ],
      },
      {
        id: "tier-early-1",
        name: "Early Bird Developer Pass",
        tierType: "EARLY_BIRD",
        price: 199,
        capacity: 400,
        soldCount: 400,
        perks: [
          "Full 3-day conference access",
          "Digital video recording archive"
        ],
      },
    ],
  },
  {
    id: "evt-ai-engineer-world",
    title: "AI Engineer World Fair: Agents & LLMs in Production",
    slug: "ai-engineer-world-fair",
    description: "Deep dive into multi-agent swarms, RAG with pgvector, fine-tuning reasoning models, and production LLM evaluation harnesses.",
    category: "AI & ML Summit",
    city: "New York, NY",
    venue: "Javits Convention Center",
    date: "November 8-10, 2026",
    time: "08:30 AM - 05:30 PM EST",
    bannerGradient: "from-violet-600 via-purple-600 to-pink-700",
    speakersCount: 45,
    featured: true,
    tiers: [
      {
        id: "tier-ga-2",
        name: "Standard Engineer Pass",
        tierType: "GENERAL_ADMISSION",
        price: 349,
        capacity: 1500,
        soldCount: 1120,
        perks: [
          "Keynotes & 4 technical breakout tracks",
          "AI Hackathon & project showcase",
          "Catered breakfast & networking mixers"
        ],
      },
      {
        id: "tier-vip-2",
        name: "Founder & Investor VIP Pass",
        tierType: "VIP_ALL_ACCESS",
        price: 899,
        capacity: 300,
        soldCount: 260,
        perks: [
          "Priority check-in lane",
          "Access to 1-on-1 VC & Angel meeting lounge",
          "VIP Dinner with AI Research Scientists"
        ],
      },
    ],
  },
  {
    id: "evt-cloud-native-devops",
    title: "Cloud Native & Kubernetes Scale Summit",
    slug: "cloud-native-scale-2026",
    description: "Production post-mortems, eBPF telemetry, multi-region database failovers, and zero-trust edge infrastructure.",
    category: "Cloud & DevOps",
    city: "Seattle, WA",
    venue: "Seattle Convention Center",
    date: "December 3-5, 2026",
    time: "09:00 AM - 05:00 PM PST",
    bannerGradient: "from-emerald-600 via-teal-600 to-cyan-800",
    speakersCount: 28,
    featured: false,
    tiers: [
      {
        id: "tier-ga-3",
        name: "DevOps Pass",
        tierType: "GENERAL_ADMISSION",
        price: 249,
        capacity: 800,
        soldCount: 530,
        perks: [
          "Full access to cloud tracks",
          "Hands-on Kubernetes labs"
        ],
      },
    ],
  },
];

export const INITIAL_BOOKINGS: BookingTicket[] = [
  {
    id: "bkg-101",
    eventId: "evt-nextjs-summit",
    eventTitle: "Global Next.js & React 19 Architecture Summit 2026",
    eventDate: "October 14-16, 2026",
    eventCity: "San Francisco, CA",
    venue: "Moscone West Center, Hall D",
    tierName: "VIP All-Access & Speaker Dinner",
    customerName: "Alex Vance",
    customerEmail: "alex.vance@eventvibe.io",
    quantity: 1,
    totalPrice: 799,
    qrPassCode: "EVT-VIP-98421",
    isScanned: false,
    bookedAt: "May 12, 2026",
  },
  {
    id: "bkg-102",
    eventId: "evt-ai-engineer-world",
    eventTitle: "AI Engineer World Fair: Agents & LLMs in Production",
    eventDate: "November 8-10, 2026",
    eventCity: "New York, NY",
    venue: "Javits Convention Center",
    tierName: "Standard Engineer Pass",
    customerName: "Alex Vance",
    customerEmail: "alex.vance@eventvibe.io",
    quantity: 2,
    totalPrice: 698,
    qrPassCode: "EVT-GA-44109",
    isScanned: true,
    bookedAt: "May 10, 2026",
  },
];

