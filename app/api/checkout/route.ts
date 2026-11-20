import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventId, tierId, quantity, customerEmail, customerName } = body;

    const mockSessionId = `cs_test_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const mockQrPass = `EVT-${tierId.toUpperCase().slice(0, 3)}-${Math.floor(10000 + Math.random() * 90000)}`;

    return NextResponse.json({
      status: "success",
      sessionId: mockSessionId,
      checkoutUrl: `/tickets?success=true&pass=${mockQrPass}`,
      qrPassCode: mockQrPass,
      booking: {
        eventId,
        tierId,
        quantity,
        customerEmail,
        customerName,
        paymentStatus: "paid",
        totalPriceCents: 29900 * (quantity || 1),
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to initiate Stripe Checkout session" }, { status: 400 });
  }
}

