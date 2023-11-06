"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import "./style.css";

const SignUp = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [btnDisable, setBtnDisable] = React.useState(true);
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  }, [user]);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("api/users/signup", user);
      console.log("Sign up", response);
      router.push("/login");
    } catch (error: any) {
      console.log("Sign up failed", error.message);
      toast.error(error.mesaage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="h-screen nsh">
        <div className="h-full">
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div className="shrink-1 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
              <Image
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="Sample image"
                width={299}
                height={200}
              />
            </div>

            <div className="md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
              <h1 className="mb-4 text-4xl font-semibold">
                {isLoading ? "Proccessing " : "Sign up"}
              </h1>
              <div className="relative mb-6">
                <label className="pointer-events-none">User name</label>
                <input
                  type="text"
                  className="peer block min-h-[auto] border-inherit p-2 rounded border-2 border-indigo-200 border-b-indigo-500 focus:border-l-indigo-500 focus:outline-none"
                  id="username"
                  placeholder="User Name"
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                />
              </div>
              <div className="relative mb-6">
                <label className="pointer-events-none">Email address</label>
                <input
                  type="email"
                  className="peer block min-h-[auto] border-inherit p-2 rounded border-2 border-indigo-200 border-b-indigo-500 focus:border-l-indigo-500 focus:outline-none focus:ring-0"
                  id="email"
                  placeholder="Email address"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>

              <div className="relative mb-6">
                <label className="pointer-events-none">Password</label>
                <input
                  type="password"
                  className="peer  block min-h-[auto]  p-2 rounded border-2 border-indigo-200 border-b-indigo-500 focus:border-l-indigo-500 focus:outline-none -webkit-text-security: square"
                  id="password"
                  style={{}}
                  placeholder="Password"
                  value={user.password}
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                />
              </div>
              <div className="text-center lg:text-left mb-3">
                <button
                  type="button"
                  // disabled={btnDisable}
                  onClick={onSignUp}
                  className=" bg-cyan-600 inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none"
                >
                  {btnDisable ? "No sign up" : "Sign up"}
                </button>
                <p className="italic font-mono mt-2">
                  You have already acounnt vist{" "}
                  <Link href="/login">
                    <b>Login.</b>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;

function post(
  arg0: string,
  user: { email: string; password: string; username: string }
) {
  throw new Error("Function not implemented.");
}
