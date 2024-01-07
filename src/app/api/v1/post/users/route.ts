import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const authorId = headers().get("authorId");

    // Check if userId is provided in headers
    if (!authorId) {
      return new NextResponse("UserId not provided in headers", {
        status: 400,
      });
    }

    const userExists = await prisma.user.findFirst({ where: { id: authorId } });
    if (!userExists) {
      return NextResponse.json({
        status: 409,
        message: "Author id not exists",
      });
    }

    const allposts = await prisma.post.findMany({
      where: { authorId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(allposts);
  } catch (error) {
    console.error(error);
    return new NextResponse("Something went wrong" + error, { status: 500 });
  }
}
