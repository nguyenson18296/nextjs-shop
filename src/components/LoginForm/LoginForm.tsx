"use client"
import React, { useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/navigation'

import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { getUsersProfile } from "@/libs/store/usersSlice";
import { useAppDispatch } from "@/libs/hooks/useRedux";

import { Navbar } from "@/components/common/Navbar";
import { BASE_URL } from "@/constants";

interface ILoginForm {
  username: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();
  const dispatch = useAppDispatch();
  const router = useRouter()

  const onSubmit: SubmitHandler<ILoginForm> = useCallback(
    async (data) => {
        console.log("data", data);
        try {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(data)
            })
            const dataJson = await response.json();
            if (dataJson.success) {
                const userProfile = {
                    username: dataJson.data.username,
                    id: dataJson.data.id,
                    role: dataJson.data.role,
                    avatar: dataJson.data.avatar ?? 'http://res.cloudinary.com/dou7jklnk/image/upload/v1708606501/qxayjksgqntvriiuprvh.webp'
                }
                dispatch(getUsersProfile(userProfile))
                localStorage.setItem('user', JSON.stringify(userProfile));
                localStorage.setItem('token', dataJson.access_token);
                router.push('/san-pham')
            }
        } catch (e) {
            console.error("error", e);
        }
    },
    [dispatch, router]
  );

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit(onSubmit)} className="p-5 bg-white dark:bg-gray-900 antialiased p-4 border border-gray-200 bg-gray-50 rounded-t-xl dark:border-gray-600 dark:bg-gray-700 w-[500px] py-5 mx-auto mt-[100px]">
        <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
          Đăng nhập
        </h2>
        <Input label="Tên đăng nhập" placeholder="Tên đăng nhập" name="username" register={register} />
        <Input label="Mật khẩu" placeholder="Mật khẩu" type="password" name="password" register={register} />
        <Button name="Đăng nhập" className="mt-3" type="submit" />
      </form>
    </>
  );
};
