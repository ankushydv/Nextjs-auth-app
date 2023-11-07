"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<any>(null);

  const logout = async () => {
    try {
      const response = await axios.get("api/users/logout");
      toast.success("Logged out");
      router.push("/login");
    } catch (error: any) {
      console.log("Logout failed!!!", error);
      toast.error(error.message);
    }
  };

  const getUserData = async () => {
    try {
      const response = await axios.get("api/users/user");
      console.log("Get user data", response.data);
      setUserDetails(response.data.data);
    } catch (error: any) {
      console.log("Get user data failed!!!", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!userDetails) {
      getUserData();
    }
  }, [userDetails]);

  return (
    <>
      <div className="flex flex-col items-center min-h-screen py-3">
        <h1 className="text-4xl font-mono pt-3">User Profile</h1>
        {userDetails ? (
          <>
            <p className="text-black font-bold p-1 ">{userDetails?.username}</p>
            <p className="text-black font-bold p-1">{userDetails?.email}</p>
          </>
        ) : (
          "Loading"
        )}
        <button
          onClick={logout}
          className="bg-blue-500 mt-4 inline-block rounded p-2 text-white"
        >
          Logout
        </button>
      </div>
    </>
  );
}
