const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const drivers = [
    {
      first_name: "James",
      last_name: "Wilson",
      profile_image_url: "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
      car_image_url: "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
      car_seats: 4,
      rating: 4.80
    },
    {
      first_name: "David",
      last_name: "Brown",
      profile_image_url: "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
      car_image_url: "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
      car_seats: 5,
      rating: 4.60
    },
    {
      first_name: "Michael",
      last_name: "Johnson",
      profile_image_url: "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
      car_image_url: "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
      car_seats: 4,
      rating: 4.70
    },
    {
      first_name: "Robert",
      last_name: "Green",
      profile_image_url: "https://ucarecdn.com/fdfc54df-9d24-40f7-b7d3-6f391561c0db/-/preview/626x417/",
      car_image_url: "https://ucarecdn.com/b6fb3b55-7676-4ff3-8484-fb115e268d32/-/preview/930x932/",
      car_seats: 4,
      rating: 4.90
    }
  ];

  for (const driver of drivers) {
    await prisma.drivers.create({
      data: driver,
    });
  }

  const rides = [
    {
      origin_address: "Kathmandu, Nepal",
      destination_address: "Pokhara, Nepal",
      origin_latitude: 27.717245,
      origin_longitude: 85.323961,
      destination_latitude: 28.209583,
      destination_longitude: 83.985567,
      ride_time: 391,
      fare_price: 19500.00,
      payment_status: "paid",
      driver_id: 2,
      user_id: "1",
      created_at: new Date("2024-08-12T05:19:20.620Z")
    },
    {
      origin_address: "Jalkot, MH",
      destination_address: "Pune, Maharashtra, India",
      origin_latitude: 18.609116,
      origin_longitude: 77.165873,
      destination_latitude: 18.520430,
      destination_longitude: 73.856744,
      ride_time: 491,
      fare_price: 24500.00,
      payment_status: "paid",
      driver_id: 1,
      user_id: "1",
      created_at: new Date("2024-08-12T06:12:17.683Z")
    },
    {
      origin_address: "Zagreb, Croatia",
      destination_address: "Rijeka, Croatia",
      origin_latitude: 45.815011,
      origin_longitude: 15.981919,
      destination_latitude: 45.327063,
      destination_longitude: 14.442176,
      ride_time: 124,
      fare_price: 6200.00,
      payment_status: "paid",
      driver_id: 1,
      user_id: "1",
      created_at: new Date("2024-08-12T08:49:01.809Z")
    },
    {
      origin_address: "Okayama, Japan",
      destination_address: "Osaka, Japan",
      origin_latitude: 34.655531,
      origin_longitude: 133.919795,
      destination_latitude: 34.693725,
      destination_longitude: 135.502254,
      ride_time: 159,
      fare_price: 7900.00,
      payment_status: "paid",
      driver_id: 3,
      user_id: "1",
      created_at: new Date("2024-08-12T18:43:54.297Z")
    }
  ];

  for (const ride of rides) {
    await prisma.rides.create({
      data: ride,
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });