"use client";
import { createContext, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { toast, Bounce } from "react-toastify";

export type IUser = {
  username: String | null;
  email: String | null;
  type: String | null;
  id: Number | null;
};

type authState = {
  user: IUser | null;
  accessToken: String | null;
};

type IAuthContext = {
  auth: authState;
  setAuth: React.Dispatch<React.SetStateAction<authState>> | null;
  logout: (() => void) | null;
};

export const AuthContext = createContext<IAuthContext>({
  auth: {
    user: null,
    accessToken: "",
  },
  setAuth: null,
  logout: null,
});

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [auth, setAuth] = useState<authState>({
    user: null,
    accessToken: "",
  });

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setAuth({
      user: null,
      accessToken: "",
    });
    toast.success(`Logout complete. Until next time!`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    router.push("/login");
  };
  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
