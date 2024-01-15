import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { emailAddress, password } = reqBody;

    //check if user exists
    const user = await prisma.employee.findFirst({ where: { emailAddress } });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    // Check if the account is blocked
    if (user.blocked) {
      return NextResponse.json(
        { error: "Account is blocked. Please contact support." },
        { status: 403 }
      );
    }
    //check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      // Increment login attempts only when the password is incorrect
      await prisma.employee.update({
        where: { id: user.id },
        data: {
          attempts: user.attempts + 1,
          lastLoginAttempt: new Date(),
        },
      });

      // Check if max attempts reached and block the account
      if (user.attempts + 1 >= user.maxAttempts) {
        // Block the account if max attempts reached
        await prisma.employee.update({
          where: { id: user.id },
          data: {
            blocked: true,
          },
        });
        return NextResponse.json(
          { error: "Account is blocked. Please contact support." },
          { status: 403 }
        );
      }

      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

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
      token: token,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to login" + error },
      { status: 500 }
    );
  }
}
