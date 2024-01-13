import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, phoneNumber, firstName, lastName } = await req.json();

    await prisma.$connect();

    const userExits = await prisma.contact.findFirst({ where: { email } });
    if (userExits) {
      return NextResponse.json({
        success: false,
        message: "User already exists",
        status: 422,
      });
    }

    const contactInfo = await prisma.contact.create({
      data: {
        email,
        firstName,
        lastName,
        phoneNumber,
      },
    });

    return NextResponse.json({
      message: "Contact created successfully",
      status: 201,
      data: contactInfo,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error creating contact" + error,
      status: 500,
      success: false,
    });
  }
}

export async function GET(){
  try {
    
  } catch (error) {
        return NextResponse.json({
      message: "Error getting contacts" + error,
      status: 500,
      success: false,
    });
  }
}
