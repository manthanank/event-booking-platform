import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "EventVibe • Global Tech Conferences & Ticket Booking",
    short_name: "EventVibe",
    description: "Enterprise event ticketing platform with Stripe payments, instant QR code passes, and organizer gate validation.",
    start_url: "/",
    display: "standalone",
    background_color: "#030712",
    theme_color: "#ec4899",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
