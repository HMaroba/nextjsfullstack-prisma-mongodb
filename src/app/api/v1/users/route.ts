import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const getUsers = await prisma.user.findMany();

    return NextResponse.json({
      users: getUsers,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" +error });
  }
}
