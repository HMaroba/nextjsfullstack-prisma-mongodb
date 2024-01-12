import {  NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const users = await prisma.user.findFirst({
      where: { id: String(id) },
    });

    const userId = await prisma.user.findFirst({
        where: { id: String(id) },
      });
  
      if (!userId) {
        return NextResponse.json({
          message: "User does not exists",
          success: false,
        });
      }

    return NextResponse.json(users);
  } catch (error) {
    return new NextResponse("Something went wrong" + error, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const userId = await prisma.user.findFirst({
      where: { id: String(id) },
    });

    if (!userId) {
      return NextResponse.json({
        message: "User does not exists",
        success: false,
      });
    }
    await prisma.user.delete({
      where: { id: String(id) },
    });
    return NextResponse.json({ msg: "User deleted successfully" });
  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const { name } = await request.json();

    const userId = await prisma.user.findFirst({
      where: { id: String(id) },
    });

    if (!userId) {
      return NextResponse.json({
        message: "User does not exists",
        success: false,
      });
    }

    await prisma.user.update({
      where: { id: String(id) },
      data: { name },
    });

    return NextResponse.json({ msg: "Profile updated successfully" });
  } catch (error) {
    return new NextResponse("Something went wrong" + error, { status: 500 });
  }
}
