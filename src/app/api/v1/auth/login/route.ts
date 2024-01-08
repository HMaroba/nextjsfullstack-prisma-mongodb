import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { emailAddress, password } = reqBody;
    console.log(reqBody);

    //check if user exists
    const user = await prisma.employee.findUnique({ where: { emailAddress } });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    //check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }
    console.log(user);

    //create token data
    const tokenData = {
      id: user.id,
      emailAddress: user.emailAddress,
    };

    //create token
    const token = await jwt.sign(tokenData, process.env.NEXTAUTH_SECRET!, {
      expiresIn: "1d",
    });



    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      token : token
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
    
  } catch (error) {
    return NextResponse.json({ message: "Unable to login" }, { status: 500 });
  }
}
