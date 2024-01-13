import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const users = await prisma.contact.findUnique({
      where: { id },
    });

    return NextResponse.json(users);
  } catch (error) {
    return new NextResponse("Something went wrong" + error, { status: 500 });
  }
}
