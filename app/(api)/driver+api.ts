import prisma from "@/prismaClient";

export async function GET(request: Request) {
  try {
    const response = await prisma.drivers.findMany();

    return Response.json({ data: response });
  } catch (error) {
    console.error("Error fetching drivers:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
