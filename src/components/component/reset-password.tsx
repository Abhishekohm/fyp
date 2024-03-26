"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NoClick from "./NoClick";
import { useState } from "react";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(email);
    setLoading(true);
    try {
      const res = await axios.get(
        `https://fypbackend-production-d00d.up.railway.app/api/auth/resetPassword/?email=${email}`
      );
      if (res.data.status) {
        setEmail("");
        toast.info(
          "Password reset email sent successfully. Please check your inbox.",
          {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          }
        );
        setLoading(false);
        setTimeout(() => {
          router.push("/login");
        }, 4500);
      } else {
        toast.error(
          "Something went wrong while sending the password reset email.",
          {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          }
        );
      }
      setLoading(false);
    } catch (e :any) {
      setLoading(false);
      console.dir(e);
      toast.error(
        e.message,
        {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        }
      );
    }
  };
  return (
    <>
      {loading && <NoClick />}
      <div className="h-screen w-screen">
        <header className="flex items-center justify-between h-[70px] px-4 bg-black shadow-md">
          <div className="text-3xl font-bold text-white">OpenAcademy</div>
        </header>
        <div className="h-5/6 flex justify-center items-center">
          <Card className="w-[400px] max-w-md mx-auto">
            <CardHeader className="text-center space-y-1">
              <CardTitle>Forgot Password</CardTitle>
              <CardDescription>
                Enter your email to reset your password
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div>
                  <Input
                    placeholder="Email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full bg-purple-600 text-white text-lg"
                  type="submit"
                >
                  {loading ? "Generating reset email..." : "Reset Password"}
                </Button>
              </CardContent>
            </form>
            <CardFooter className="flex justify-center">
              <Link className="text-sm underline" href="/login">
                Back to login
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
