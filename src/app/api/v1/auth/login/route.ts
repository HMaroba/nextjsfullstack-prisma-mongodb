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
        { status: 404 }
      );
    }

    console.log(user);
    

    // Check if the account is blocked
    // if (user.blocked) {
    //   return NextResponse.json(
    //     { error: "Account is blocked. Please contact support." },
    //     { status: 403 }
    //   );
    // }
    // Check if the account is blocked
    if (user.blocked) {
      const blockTime = user.lastLoginAttempt?.getTime() || 0;
      const currentTime = new Date().getTime();
      const timeDifferenceInMinutes = (currentTime - blockTime) / (1000 * 60);

      // Check if 30 minutes have passed since the account was blocked
      if (timeDifferenceInMinutes >= 5) {
        // Unblock the account
        await prisma.employee.update({
          where: { id: user.id },
          data: {
            blocked: false,
            attempts: 0,
            lastLoginAttempt: null,
          },
        });
      } else {
        const minutesLeft = Math.ceil(5 - timeDifferenceInMinutes);
        return NextResponse.json(
          // { error: "Account is blocked. Please contact support." },
          {
            error: `Account is blocked. Please wait ${minutesLeft} minutes and try again.`,
          },
          { status: 403 }
        );
      }
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
      if (user.attempts + 1 === user.maxAttempts) {
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

      const leftAttemps = user.maxAttempts - user.attempts;
      return NextResponse.json(
        { error: `Invalid password ${leftAttemps} attempts left` },
        { status: 400 }
      );
    }

    // Reset login attempts on successful login
    await prisma.employee.update({
      where: { id: user.id },
      data: {
        attempts: 0,
        lastLoginAttempt: null,
      },
    });

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
