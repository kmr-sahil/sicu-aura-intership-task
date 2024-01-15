import { NextRequest, NextResponse } from "next/server";
import signupHandler from "@/middleware/middleware"; // Update the path

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const details = reqBody;
    console.log(details);

    const response = await signupHandler(request, request.res);

    return response;
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}