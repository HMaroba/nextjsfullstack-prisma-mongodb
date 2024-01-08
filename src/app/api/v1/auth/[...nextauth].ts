import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
const prisma = new PrismaClient();

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        const { emailAddress, password } = credentials as {
          emailAddress: string;
          password: string;
        };

        const user = await prisma.employee.findFirst({
          where: { emailAddress },
        });
        if (!user) throw new Error("No user Found with Email");

        const checkPassword = await compare(password, user?.password as string);
        if (!checkPassword) throw new Error("Password not matched");

        return user;
      },
      credentials: {},
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
