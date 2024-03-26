"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NoClick from "./NoClick";
import { toast,Bounce } from "react-toastify";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUT] = useState("learner");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    console.log(userName);
    console.log(password);
    console.log(email);
    console.log(userType);
    setLoading(true);
    try {
      const response = await fetch(
        `https://fypbackend-production-d00d.up.railway.app/api/auth/register/`,
        {
          method: "POST",
          // mode: 'no-cors',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userName,
            password: password,
            email: email,
            type: userType,
          }),
        }
      );
      if (response.ok) {
        try {
          const response = await fetch(
            `https://fypbackend-production-d00d.up.railway.app/api/auth/verifyEmail/?email=${email}`,
            {
              method: "get",
              // mode: 'no-cors',
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.ok)
          {
            toast.success(
              "Verification email sent to your inbox. Please check it. Redirecting to login page in 5 seconds.",
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
            setUserName("");
            setPassword("");
            setEmail("");
            setTimeout(() => {
              setLoading(false);
              router.push("/login");
            },4500)
          } else {
            toast.error("Error sending verification email.", {
              position: "bottom-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
            setLoading(false);
          }
        } catch (e) {
          setLoading(false);
          toast.error("Error sending verification email.", {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
        setLoading(false);
      } else {
        let msg = await response.json();
        console.error("Registration failed!:", msg.message);
        setLoading(false);
        toast.error(`${msg.message}.`, {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(`Error while sign in.`, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      {loading && <NoClick />}
      <div className="h-screen">
        <header className="flex items-center justify-between h-auto px-4 bg-black shadow-md">
          <div className="text-3xl font-bold text-white">OpenAcademy</div>
          <Button className="px-4 py-2 m-4 bg-purple-600 text-white rounded-md">
            <Link href="/login">Log In</Link>
          </Button>
        </header>
        <div className="flex h-5/6 items-center justify-center">
          <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-lg">
            <h1 className="text-center text-2xl font-bold">
              Sign Up to OpenAcademy!
            </h1>
            <div className="flex justify-between my-4">
              <Button
                className={`w-1/2 rounded-r-none ${
                  userType === "learner" ? "border border-black" : ""
                }`}
                onClick={() => {
                  setUT("learner");
                }}
              >
                Student
              </Button>
              <Button
                className={`w-1/2 rounded-l-none ${
                  userType === "educator" ? "border border-black" : ""
                }`}
                onClick={() => {
                  setUT("educator");
                }}
              >
                Teacher
              </Button>
            </div>

            <form onSubmit={handleSignUp} className="space-y-6">
              <div>
                <Input
                  placeholder="User Name"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div>
                <Input
                  placeholder="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>


              <Button
                className="w-full bg-purple-600 text-white text-lg"
                type="submit"
              >
                {loading ? "Hang tight, we're on it..." : "Sign in"}
              </Button>
            </form>

            <div className="text-center">
              Already a User?
              <Link
                className="ml-1 text-md text-blue-600 hover:underline"
                href="/login"
              >
                Log In!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
