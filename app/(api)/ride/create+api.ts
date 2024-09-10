import prisma from "@/prismaClient";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      origin_address,
      destination_address,
      origin_latitude,
      origin_longitude,
      destination_latitude,
      destination_longitude,
      ride_time,
      fare_price,
      payment_status,
      driver_id,
      user_id,
    } = body;

    if (
      !origin_address ||
      !destination_address ||
      !origin_latitude ||
      !origin_longitude ||
      !destination_latitude ||
      !destination_longitude ||
      !ride_time ||
      !fare_price ||
      !payment_status ||
      !driver_id ||
      !user_id
    ) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const rideTime = parseInt(ride_time, 10);

    const response = await prisma.rides.create({
      data: {
        origin_address,
        destination_address,
        origin_latitude,
        origin_longitude,
        destination_latitude,
        destination_longitude,
        ride_time: rideTime,
        fare_price,
        payment_status,
        driver_id,
        user_id,
        created_at: new Date(),
      },
    });

    return Response.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error("Error inserting data into recent_rides:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
