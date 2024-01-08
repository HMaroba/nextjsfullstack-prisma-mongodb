import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const {
      fullName,
      phoneNumber,
      role,
      department,
      emailAddress,
      password,
      gender,
      salary,
      income,
    } = await request.json();

    if (!emailAddress || !password || !phoneNumber || !fullName) {
      return NextResponse.json(
        { success: false, message: "Please provide all fields" },
        {
          status: 409,
        }
      );
    }

    const userExists = await prisma.employee.findFirst({
      where: { emailAddress },
    });

    const userPhoneExists = await prisma.employee.findFirst({
      where: { phoneNumber },
    });

    if (userExists) {
      return NextResponse.json({
        message: "User already exists",
        status: 400,
      });
    }
    if (userPhoneExists) {
      return NextResponse.json({
        message: "User with this phone number already exists",
        status: 400,
      });
    }

    const hashedPassword = await hash(password, 12);
    const newEmployee = await prisma.employee.create({
      data: {
        fullName,
        phoneNumber,
        role,
        department,
        gender,
        salary,
        emailAddress,
        password: hashedPassword,
        income: {
          create: income,
        },
      },
    });

    return NextResponse.json({
      message: "User created successfully",
      status: 201,
      data: newEmployee,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wront" + error,
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const records = await prisma.employee.findMany();
    if (!records) {
      return NextResponse.json({ message: "No data available at moment" });
    }

    return NextResponse.json({ success: true, employees: records });
  } catch (error) {
    return NextResponse.json({ message: "Unable to get data", status: 500 });
  }
}
