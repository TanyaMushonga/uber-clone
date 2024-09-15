const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const dummyData = [
    {
      address: "10 First Ave, Harare, Zimbabwe",
      latitude: -17.8240,
      longitude: 31.0300,
      price: 4.5,
      time: "07:00 - 19:00",
      rating: 4,
    },
    {
      address: "20 Second Ave, Harare, Zimbabwe",
      latitude: -17.8280,
      longitude: 31.0500,
      price: 3.0,
      time: "06:00 - 18:00",
      rating: 5,
    },
    {
      address: "30 Third Ave, Harare, Zimbabwe",
      latitude: -17.8270,
      longitude: 31.0450,
      price: 4.2,
      time: "08:00 - 20:00",
      rating: 3,
    },
    {
      address: "40 Fourth Ave, Harare, Zimbabwe",
      latitude: -17.8490,
      longitude: 31.0600,
      price: 5.5,
      time: "09:00 - 17:00",
      rating: 4,
    },
    {
      address: "50 Fifth Ave, Harare, Zimbabwe",
      latitude: -17.8320,
      longitude: 31.1250,
      price: 2.8,
      time: "05:00 - 22:00",
      rating: 5,
    },
  ];

  for (const parking of dummyData) {
    await prisma.parkings.create({
      data: parking,
    });
  }

  console.log("Dummy data inserted successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });