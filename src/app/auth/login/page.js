"use client";
import { Input } from "@/components/ui/input";
import { loginService } from "@/services/authService";
import { loginSuccess } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const loginHandle = async () => {
    try {
      const res = await loginService(user);
      if (res?.success) {
        dispatch(loginSuccess(res));
        router?.push("/category/biohacking");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center h-dvh">
      <div className="w-[524px] bg-gray-800 p-4 rounded">
        <h3 className="font-quando text-2xl text-center">Login</h3>
        <div className="flex flex-col mt-8 gap-4">
          <Input placeholder="Username" value={user?.userName} name="userName" onChange={handleChange} />
          <Input type="password" placeholder="Password" value={user?.password} name="password" onChange={handleChange} />
          <button className="p-8 py-3 bg-yellow-400 text-gray-900 rounded-xl font-bold cursor-pointer" onClick={loginHandle}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
