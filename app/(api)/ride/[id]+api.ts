import prisma from "@/prismaClient";

export async function GET(request: Request, { id }: { id: string }) {
  if (!id)
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
    });

  try {
    const rides = await prisma.rides.findMany({
      where: {
        user_id: id,
      },
      include: {
        driver: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    const response = rides.map((ride) => ({
      ride_id: ride.ride_id,
      origin_address: ride.origin_address,
      destination_address: ride.destination_address,
      origin_latitude: ride.origin_latitude,
      origin_longitude: ride.origin_longitude,
      destination_latitude: ride.destination_latitude,
      destination_longitude: ride.destination_longitude,
      ride_time: ride.ride_time,
      fare_price: ride.fare_price,
      payment_status: ride.payment_status,
      created_at: ride.created_at,
      driver: ride.driver
        ? {
            driver_id: ride.driver.id,
            first_name: ride.driver.first_name,
            last_name: ride.driver.last_name,
            profile_image_url: ride.driver.profile_image_url,
            car_image_url: ride.driver.car_image_url,
            car_seats: ride.driver.car_seats,
            rating: ride.driver.rating,
          }
        : null,
    }));

    return new Response(JSON.stringify({ data: response }));
  } catch (error) {
    console.error("Error fetching recent rides:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
