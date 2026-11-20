# EventVibe Enterprise - AI Architecture & Context Blueprint

## Overview
EventVibe is a full-stack event discovery, transactional ticket booking, and organizer gate validation platform. It manages global technology summits, developer conferences, and private workshops with Stripe payments and instant QR code passes.

## Tech Stack
- Framework: Next.js 15 (App Router)
- Language: TypeScript 5.7+
- Styling: Tailwind CSS & Lucide Icons
- Database: PostgreSQL with Prisma ORM (`prisma/schema.prisma`)
- Payments: Stripe Checkout & Webhook event simulation
- Check-in: Deterministic QR Code Pass generation & camera scanner simulator
- Analytics: Recharts & Vercel Web Analytics / Speed Insights

## Key Routes
- `/`: Enterprise marketing landing page with interactive ticket pricing calculator, event countdown clock, and organizer testimonials.
- `/events`: Discovery catalog of tech conferences, summits, and workshops with city/date filters.
- `/events/[id]`: Detailed event briefing with agenda, speakers, venue map, and interactive checkout modal.
- `/tickets`: Digital ticket pass wallet displaying QR codes, Apple Wallet links, and check-in status.
- `/scanner`: Event organizer check-in station with simulated QR laser scan and admission verification.
- `/analytics`: Ticket sales velocity, revenue curves, and tier sellout telemetry.
- `/settings`: Organizer Stripe Connect status, Prisma schema explorer, and attendee CSV export.
- `/api/checkout`: Stripe checkout session initiation route.
