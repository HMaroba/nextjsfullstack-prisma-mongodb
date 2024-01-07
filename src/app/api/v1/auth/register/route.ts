import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email, name , phoneNumber } = await request.json();

    const userExists = await prisma.user.findFirst({ where: { email } });

    if (userExists) {
      return NextResponse.json({
        status: 409,
        message: "User Already exists",
        success: false,
      });
    }
    await prisma.user.create({
      data: { name, email, phoneNumber },
    });

    return NextResponse.json(
      { success: true, message: "User created successfully" },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong" + error,
      success: false,
      status: 500,
    });
  }
}
