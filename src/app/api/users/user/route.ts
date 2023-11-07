import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const id = await getDataFromToken(request);
    const user = await User.findById(id).select("-password");
    console.log("user", user);
    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error: any) {
    console.log("Error", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
