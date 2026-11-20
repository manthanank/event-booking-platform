export type TicketTierType = "EARLY_BIRD" | "GENERAL_ADMISSION" | "VIP_ALL_ACCESS";

export interface TicketTier {
  id: string;
  name: string;
  tierType: TicketTierType;
  price: number; // in USD dollars
  capacity: number;
  soldCount: number;
  perks: string[];
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: "AI & ML Summit" | "Cloud & DevOps" | "Full-Stack Dev" | "Web3 & Security";
  city: string;
  venue: string;
  date: string;
  time: string;
  bannerGradient: string;
  tiers: TicketTier[];
  speakersCount: number;
  featured: boolean;
}

export interface BookingTicket {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventCity: string;
  venue: string;
  tierName: string;
  customerName: string;
  customerEmail: string;
  quantity: number;
  totalPrice: number;
  qrPassCode: string;
  isScanned: boolean;
  bookedAt: string;
}

