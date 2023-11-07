"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();

  const logout = async () => {
    try {
      const response = await axios.get("api/users/logout");
      toast.success("Logged out");
      console.log("Logout", response);
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
      return response.data;
    } catch (error: any) {
      console.log("Get user data failed!!!", error);
      toast.error(error.message);
    }
  };
  getUserData();
  return (
    <>
      <div className="flex flex-col items-center min-h-screen py-3">
        <h1 className="text-4xl font-mono pt-3">Profile</h1>
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
