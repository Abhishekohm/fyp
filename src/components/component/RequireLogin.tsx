"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useAuthContext } from "@/hooks/authhooks";
import { useRouter } from "next/navigation";
import { IUser } from "@/context";
import LoadingPage from "./LoadingPage";

const RequireLogin = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { auth, setAuth } = useAuthContext();
  useEffect(() => {
    console.log(auth);
    if (!auth.user) {
      const user: IUser = JSON.parse(
        localStorage.getItem("user") as string
      ) as IUser;
      console.log(user);
      const accessToken = localStorage.getItem("accessToken") as string;
      console.log(accessToken);
      if (!user || !accessToken) {
        router.push("/login");
      } else {
        setAuth &&
          setAuth({
            user: user,
            accessToken: accessToken,
          });
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);
  return <>{loading ? <LoadingPage /> : <div>{children}</div>}</>;
};

export default RequireLogin;
