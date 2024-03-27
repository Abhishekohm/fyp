"use client";
import { useAuthContext } from "@/hooks/authhooks";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";
import { IUser } from "@/context";

const NotLoggedIn = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { auth, setAuth } = useAuthContext();
  useEffect(() => {
    console.log(auth);
    if (auth.user) {
      if (auth.user?.type === "educator") {
        router.push("/instructor/courses");
      } else {
        router.push("/dashboard");
      }
    } else {
      const user: IUser = JSON.parse(
        localStorage.getItem("user") as string
      ) as IUser;
      const accessToken = localStorage.getItem("accessToken") as string;
      if (user && accessToken) {
        setAuth &&
          setAuth({
            user: user,
            accessToken: accessToken,
          });
        if (user.type === "educator") {
          router.push("/instructor/courses/");
        } else {
          router.push("/dashboard");
        }
      } else {
        setLoading(false);
      }
    }
  }, []);
  return <>{loading ? <LoadingPage /> : <div>{children}</div>}</>;
};

export default NotLoggedIn;
