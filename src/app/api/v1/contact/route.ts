import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const {email , phoneNumber, firstName, lastName} = await req.json();

    const userExits = await pris
  } catch (error) {
    return NextResponse.json({
      message: "Error creating contact",
      status: 500,
      success: false,
    });
  }
}
