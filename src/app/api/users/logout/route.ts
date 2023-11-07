import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const response = await NextResponse.json({
      message: "Logout Success",
      success: true,
    });

    console.log("response", response);

    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
