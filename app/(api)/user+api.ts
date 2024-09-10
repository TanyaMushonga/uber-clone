import prisma from "@/prismaClient";

export async function POST(request: Request) {
  try {
    const { name, email, clerkId } = await request.json();

    if (!name || !email || !clerkId) {
      return new Response("Missing required fields", { status: 400 });
    }

    const response = await prisma.users.create({
      data: {
        name,
        email,
        clerkId,
      },
    });

    return new Response(JSON.stringify({ data: response }), { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: error }, { status: 500 });
  }
}
