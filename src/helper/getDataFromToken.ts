import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function getDataFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    if (!token) {
      return NextResponse.json({ error: "token not found" }, { status: 404 });
    }
    const decoded: any = jwt.verify(token, process.env.SECRET_TOKEN!);
    console.log(decoded);
    return decoded.id;
  } catch (error: any) {
    console.log("Error", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
