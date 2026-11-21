const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding event-booking-platform PostgreSQL database...');

  const events = [
    {
      title: 'Global AI & Autonomous Systems Summit',
      slug: 'global-ai-summit-2026',
      description: 'The premier conference for foundational intelligence, robotics, and distributed model deployment.',
      category: 'AI Summit',
      city: 'San Francisco, CA',
      venue: 'Moscone West Convention Center',
      startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 32 * 24 * 60 * 60 * 1000),
      bannerUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
      tiers: [
        { name: 'Early Bird', tierType: 'EARLY_BIRD', priceInCents: 29900, capacity: 200, perks: ['Keynote Access', 'Exhibit Hall'] },
        { name: 'General Admission', tierType: 'GENERAL_ADMISSION', priceInCents: 49900, capacity: 500, perks: ['All Stages', 'Lunch & Networking', 'Recordings'] },
        { name: 'VIP All-Access', tierType: 'VIP_ALL_ACCESS', priceInCents: 99900, capacity: 100, perks: ['VIP Lounge', 'Speaker Dinner', 'Front Row Seating'] },
      ]
    },
    {
      title: 'NextGen Cloud Architecture & Edge Expo',
      slug: 'cloud-architecture-edge-expo',
      description: 'Zero-latency computing, planetary databases, and serverless runtime engineering.',
      category: 'Cloud Expo',
      city: 'Seattle, WA',
      venue: 'Seattle Convention Center',
      startDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 62 * 24 * 60 * 60 * 1000),
      bannerUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
      tiers: [
        { name: 'General Admission', tierType: 'GENERAL_ADMISSION', priceInCents: 39900, capacity: 400, perks: ['All Technical Tracks', 'Workshops'] },
        { name: 'VIP All-Access', tierType: 'VIP_ALL_ACCESS', priceInCents: 89900, capacity: 80, perks: ['Private Roundtables', 'Executive Lounge'] },
      ]
    }
  ];

  for (const evt of events) {
    const { tiers, ...evtData } = evt;
    const createdEvent = await prisma.event.upsert({
      where: { slug: evtData.slug },
      update: evtData,
      create: evtData
    });

    for (const tier of tiers) {
      await prisma.ticketTier.create({
        data: {
          eventId: createdEvent.id,
          name: tier.name,
          tierType: tier.tierType,
          priceInCents: tier.priceInCents,
          capacity: tier.capacity,
          perks: tier.perks,
        }
      });
    }
  }

  const count = await prisma.event.count();
  console.log(`Successfully seeded event-booking-platform! Total events in DB: ${count}`);
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
