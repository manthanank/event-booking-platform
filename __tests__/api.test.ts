import { describe, it, expect } from "vitest";
import { GET as getEvents, POST as postEvent } from "../app/api/events/route";
import { POST as postCheckout } from "../app/api/checkout/route";

describe("Event Booking Platform API Routes", () => {
  it("GET /api/events returns event list", async () => {
    const req = new Request("http://localhost:3000/api/events");
    const res = await getEvents(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(Array.isArray(data.events)).toBe(true);
    expect(data.events.length).toBeGreaterThan(0);
    expect(data.events[0]).toHaveProperty("title");
    expect(data.events[0]).toHaveProperty("venue");
  });

  it("GET /api/events supports search queries", async () => {
    const req = new Request("http://localhost:3000/api/events?q=conference");
    const res = await getEvents(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
  });

  it("POST /api/events rejects requests missing required fields", async () => {
    const req = new Request("http://localhost:3000/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: "Missing title and venue" }),
    });

    const res = await postEvent(req);
    expect(res.status).toBe(400);
  });

  it("POST /api/checkout validates ticket booking payloads", async () => {
    const bookingPayload = {
      eventId: "evt-1",
      tierId: "vip-tier",
      quantity: 2,
      customerName: "Jane Smith",
      customerEmail: "jane@example.com",
    };

    const req = new Request("http://localhost:3000/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingPayload),
    });

    const res = await postCheckout(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.status).toBe("success");
    expect(data).toHaveProperty("sessionId");
  });
});
