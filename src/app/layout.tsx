'use client'

import { Open_Sans } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const inter = Open_Sans({ subsets: ["latin"] });

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
