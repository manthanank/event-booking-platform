import { NextResponse } from "next/server";
import { EventItem } from "@/lib/types";
import { INITIAL_EVENTS } from "@/lib/mock-data";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";

function generateUpcomingDynamicEvents(): EventItem[] {
  const now = new Date();
  const formatFutureDate = (daysAhead: number) => {
    const d = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${months[d.getMonth()]} ${d.getDate()}-${d.getDate() + 2}, ${d.getFullYear()}`;
  };

  return INITIAL_EVENTS.map((evt, idx) => ({
    ...evt,
    date: formatFutureDate((idx + 1) * 14),
  }));
}

let serverEvents: EventItem[] = generateUpcomingDynamicEvents();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const query = searchParams.get("q")?.toLowerCase();

  let events = [...serverEvents];

  if (isDatabaseConfigured()) {
    try {
      const dbEvents = await prisma.event.findMany({
        include: { tiers: true },
        orderBy: { startDate: "asc" },
      });
      if (dbEvents && dbEvents.length > 0) {
        events = dbEvents.map((e) => ({
          id: e.id,
          title: e.title,
          slug: e.slug,
          category: (e.category === "Cloud Expo" ? "Cloud & DevOps" : "AI & ML Summit") as EventItem["category"],
          city: e.city,
          venue: e.venue,
          date: e.startDate.toISOString().split("T")[0],
          time: "09:00 AM - 05:00 PM",
          bannerGradient: "from-blue-600 to-indigo-900",
          tiers: e.tiers.map((t) => ({
            id: t.id,
            name: t.name,
            tierType: t.tierType as any,
            price: t.priceInCents / 100,
            capacity: t.capacity,
            soldCount: t.soldCount,
            perks: t.perks,
          })),
          speakersCount: 14,
          description: e.description,
          featured: true,
        }));
      }
    } catch (e) {
      console.warn("[Events API] Database query error, using in-memory:", (e as Error).message);
    }
  }

  let filtered = [...events];

  if (category && category !== "All") {
    filtered = filtered.filter((e) => e.category.toLowerCase() === category.toLowerCase());
  }

  if (query) {
    filtered = filtered.filter(
      (e) =>
        e.title.toLowerCase().includes(query) ||
        e.city.toLowerCase().includes(query) ||
        e.venue.toLowerCase().includes(query) ||
        e.description.toLowerCase().includes(query)
    );
  }

  return NextResponse.json({
    success: true,
    totalCount: filtered.length,
    events: filtered,
    syncedAt: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.venue) {
      return NextResponse.json({ error: "Title and venue are required" }, { status: 400 });
    }

    const newEvent: EventItem = {
      id: `evt-${Date.now()}`,
      title: body.title,
      slug: body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description: body.description || "",
      category: body.category || "Full-Stack Dev",
      city: body.city || "San Francisco, CA",
      venue: body.venue,
      date: body.date || "Next Month",
      time: body.time || "09:00 AM - 05:00 PM PST",
      bannerGradient: body.bannerGradient || "from-blue-600 via-indigo-600 to-violet-800",
      speakersCount: body.speakersCount || 12,
      featured: Boolean(body.featured),
      tiers: body.tiers || [
        {
          id: `tier-ga-${Date.now()}`,
          name: "General Admission",
          tierType: "GENERAL_ADMISSION",
          price: 249,
          capacity: 500,
          soldCount: 120,
          perks: ["Full keynote access", "Barista coffee & lunch", "Conference recordings"],
        },
      ],
    };

    serverEvents = [newEvent, ...serverEvents];

    return NextResponse.json({
      success: true,
      message: "Event published to schedule",
      event: newEvent,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
