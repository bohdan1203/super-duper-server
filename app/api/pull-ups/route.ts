import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { PullUp } from "@/models/PullUp";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
};

export async function OPTIONS(): Promise<NextResponse> {
  return NextResponse.json({}, { headers: CORS_HEADERS });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDB("workouts");

    const { reps, date, time } = await request.json();

    if (!reps || typeof reps !== "number" || reps <= 0) {
      return NextResponse.json(
        { error: "reps must be a positive number" },
        { status: 400, headers: CORS_HEADERS },
      );
    }

    const now = new Date();
    const datePart =
      date ||
      `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const timePart =
      time ||
      `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const dateTime = new Date(`${datePart}T${timePart}`);

    if (isNaN(dateTime.getTime())) {
      return NextResponse.json(
        { error: "Invalid date or time format" },
        { status: 400, headers: CORS_HEADERS },
      );
    }

    const pullUp = await PullUp.create({ reps, dateTime });

    return NextResponse.json(pullUp, { status: 201, headers: CORS_HEADERS });
  } catch (error) {
    console.error("POST /api/pull-ups error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: CORS_HEADERS },
    );
  }
}
