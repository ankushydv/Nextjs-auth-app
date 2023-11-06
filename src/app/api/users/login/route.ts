import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function Post(request: NextRequest) {
  if (request.method === "POST") {
    try {
      console.log("Here still come ", request);
      const reqBody = await request.json();
      console.log(reqBody);
      const { email, password }: any = reqBody;

      //Check user exist or not.
      const user = await User.findOne({ email });

      // ..iff user did not exist then send a response with error
      if (!user) {
        return NextResponse.json(
          { error: "User does not exist" },
          { status: 400 }
        );
      }
      //..if user exist then validate a password
      const validPassword = await bcryptjs.compare(password, user.password);
      if (!validPassword) {
        return NextResponse.json(
          { error: "Invaild Password" },
          { status: 400 }
        );
      }

      //create token data for jwt first variable set user info
      const tokenData = {
        id: user._id,
        username: user.username,
        email: user.email,
      };

      const secret = process.env.SECRET_TOKEN;

      const token = await jwt.sign(tokenData, secret!, { expiresIn: "1d" });

      const response = NextResponse.json({
        message: "Login Successful",
        success: true,
      });

      response.cookies.set("token", token, { httpOnly: true });

      return response;
    } catch (error: any) {
      console.log("Something went in backend", `error:${error}`);
      NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
