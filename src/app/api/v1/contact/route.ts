import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { z } from "zod";

// Define the schema for the request body using Zod
const contactSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  phoneNumber: z.string().regex(/^\d{8}$/, {
    message: "Invalid phone number, should be 8 numeric characters",
  }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  employeeId: z.string().min(1, { message: "EMployee id is required" }),
});

export async function POST(req: Request) {
  try {


    const body = await req.json();

    // Validate the request body against the schema
    try {
      contactSchema.parse(body);
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid request body", details: error },
        { status: 400 }
      );
    }
    const { email, phoneNumber, firstName, lastName, employeeId } = body;

    await prisma.$connect();


    const userExits = await prisma.contact.findFirst({
      where: { email, phoneNumber },
    });
    if (userExits) {
      return NextResponse.json({
        success: false,
        message: "User already exists",
        status: 422,
      });
    }

    const employeeExists = await prisma.employee.findUnique({
      where: { id: employeeId },
    });
    if (!employeeExists) {
      return NextResponse.json({
        message: "Employee does not exists",
        success: false,
      });
    }

    const contactInfo = await prisma.contact.create({
      data: {
        email,
        firstName,
        lastName,
        phoneNumber,
        employeeId,
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

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany();

    if (!contacts) {
      return NextResponse.json({
        message: "No Contacts found",
      });
    }

    return NextResponse.json({
      success: true,
      Usercontacts: contacts,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error getting contacts" + error,
      status: 500,
      success: false,
    });
  }
}
