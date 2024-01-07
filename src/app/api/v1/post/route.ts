import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { authorId, title, description } = await req.json();

    const isUserExisting = await prisma.user.findFirst({ where: { id:  authorId } });
    if (!isUserExisting)
      return NextResponse.json(
        { success: false, message: "User Does not Exists...!" },
        { status: 422 }
      );

    await prisma.post.create({
      data: { authorId, title, description },
    });

    return NextResponse.json(
      { success: true, message: "Post created successfully" },
      {
        status: 201,
      }
    );
  } catch (error) {
    return new NextResponse("Something went wrong" + error, { status: 500 });
  }
}

export async function GET() {
  try {
    const allposts = await prisma.post.findMany();

    return NextResponse.json(
      { success: true, data: allposts },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
