import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();
/*Here always post method should be in capital POST */
export async function POST(request: NextRequest) {
  // if (request.method === "POST") {
  try {
    const reqBody = await request.json();
    const { email, password }: any = reqBody;
    console.log(reqBody);

    //Check user exist or not.
    const user = await User.findOne({ email });
    console.log("user", user);

    // ..iff user did not exist then send a response with error
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    //..if user exist then validate a password
    const validPassword = await bcryptjs.compare(password, user.password);
    console.log("validPassword", validPassword);
    if (!validPassword) {
      return NextResponse.json({ error: "Invaild Password" }, { status: 400 });
    }

    //create token data for jwt first variable set user info
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // const secret = process.env.SECRET_TOKEN;

    const token = await jwt.sign(tokenData, process.env.SECRET_TOKEN!, {
      expiresIn: "1d",
    });

    console.log("token", token);

    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
    });

    console.log("response", response);

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    console.log("Something went in backend", `error:${error}`);
    NextResponse.json({ error: error.message }, { status: 500 });
  }
  // }
}
