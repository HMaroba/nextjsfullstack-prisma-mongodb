import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const {
      fullName,
      phoneNumber,
      department,
      role,
      emailAddress,
      password,
      gender,
      salary,
      income,
      account,
    } = await request.json();

    if (!emailAddress || !password || !phoneNumber || !fullName) {
      return NextResponse.json(
        { success: false, message: "Please provide all fields" },
        {
          status: 409,
        }
      );
    }

    await prisma.$connect();

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
        account: {
          create: account,
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

export async function GET(req: Request) {
  try {
    //Employees data only
    const employeeRecords = await prisma.employee.findMany();

    //Pagination
    const employeeRecords1 = await prisma.employee.findMany({
      skip: 4,
      take: 3
    });

    // Employees with their incomes
    const records = await prisma.employee.findMany({
      include: {
        income: true,
      },
    });

    if (!records) {
      return NextResponse.json({ message: "No data available at moment" });
    }

    return NextResponse.json({ success: true, employees: employeeRecords });
  } catch (error) {
    return NextResponse.json({
      message: "Unable to get data" + error,
      status: 500,
    });
  }
}
