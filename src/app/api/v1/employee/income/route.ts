import { NextResponse } from "next/server";

export async function GET() {
  try {
    const getIncomes = await prisma?.income.findMany();
    return NextResponse.json({
      incomes: getIncomes,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong",
      status: 500,
    });
  }
}
