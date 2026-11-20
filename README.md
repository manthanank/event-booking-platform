# EventPulse — Technical Conference Booking & Pass Management Platform

EventPulse is a Next.js 15 application designed for discovering global engineering conferences, reserving multi-tier tickets, and managing digital wallet passes with scannable QR tokens.

## Key Features

- **Dynamic Event Discovery (`/api/events`)**: Automated future schedule calculation relative to current date, category filtering, and venue search.
- **Multi-Tier Ticket Architecture**: General Admission, VIP All-Access with Executive Dinner, and Early Bird developer tiers with live capacity countdowns.
- **Pass Wallet & Ticket Retrieval (`/tickets`)**: View booked passes, download `.ics` calendar events, and inspect digital admission passes.
- **Gate Scanner Workstation (`/scanner`)**: Live validation workstation for event staff to scan cryptographic QR check-in tokens.
- **Executive Analytics (`/analytics`)**: Tier distribution graphs, revenue breakdown, and attendance forecast charts.

## Tech Stack

- **Framework**: Next.js 15 (App Router, Server Actions)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Framer Motion, Lucide Icons
- **Payments**: Stripe Checkout Route Handlers
- **Storage**: Browser Persistence with Server Fallback
- **Deployment**: Vercel

## API Endpoints

- `GET /api/events`: Retrieve active upcoming conferences with category and search filtering.
- `POST /api/events`: Register a new conference or workshop.
- `POST /api/checkout`: Process registration and dispatch tickets.

## Getting Started

1. Navigate to the project directory:
   ```bash
   cd c:\Users\manth\projects\event-booking-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `.env.local`:
   ```bash
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. Run development server:
   ```bash
   npm run dev
   ```

5. Visit [http://localhost:3000](http://localhost:3000).

