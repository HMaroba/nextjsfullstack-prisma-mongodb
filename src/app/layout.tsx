import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FULLSTACK MONGO DB- PRISMA",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
       <QueryClientProvider client={queryClient}>
      <body className={inter.className}>{children}</body>
      </QueryClientProvider>
    </html>
  );
}
