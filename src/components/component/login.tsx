"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/hooks/authhooks";
import { IUser } from "@/context";
import NoClick from "./NoClick";
import { toast, Bounce } from "react-toastify";

export default function Login() {
  const [userType, setUT] = useState("learner");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { auth, setAuth } = useAuthContext();

  useEffect(() => {
    console.log(userType);
  }, [userType]);

  const handleLogIn = async (e: any) => {
    e.preventDefault();
    console.log(userName);
    console.log(password);
    console.log(userType);
    setLoading(true);
    try {
      const response = await fetch(
        `https://fypbackend-production-d00d.up.railway.app/api/auth/login/`,
        {
          method: "POST",
          // mode:'no-cors',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userName,
            password: password,
            type: userType,
          }),
        }
      );
      if (response.ok) {
        let msg = await response.json();
        console.log("User logged in successfully!", msg);
        const accessToken = msg.access_token;
        const user = msg.user as IUser;
        console.log(accessToken);
        console.log(user);
        localStorage.setItem("accessToken", accessToken); // Store access token in local
        localStorage.setItem("user", JSON.stringify(user));
        setAuth &&
          setAuth({
            accessToken: accessToken,
            user: user,
          });
        setUserName("");
        setPassword("");
        if (user.type === "educator") {
          router.push("/instructor/courses");
        } else {
          router.push("/dashboard");
        }
      } else {
        setLoading(false);
        let msg = await response.json();
        console.error("Failed to login!!:", msg?.message);
        toast.error(`${msg?.message}.`, {
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
    } catch (error) {
      setLoading(false);
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      {loading && <NoClick />}
      <div className="h-screen">
        <header className="flex items-center justify-between h-[70px] px-4 bg-black shadow-md">
          <div className="text-3xl font-bold text-white">OpenAcademy</div>
          <Button className="px-4 py-2 m-4 bg-teal-600 text-black rounded-md">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </header>
        <div className="flex  text-black h-5/6 items-center justify-center">
          <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-lg">
            <h1 className="text-center text-black text-2xl font-bold">
              Login to OpenAcademy!
            </h1>
            <div className="flex justify-between mb-4">
              {/* UserType buttons */}
              <Button
                className={`w-1/3 rounded-r-none ${
                  userType === "learner"
                    ? "border border-black"
                    : "border border-gray"
                }`}
                onClick={() => {
                  setUT("learner");
                }}
              >
                Student
              </Button>
              <Button
                className={`w-1/3 rounded-none ${
                  userType === "reviewer"
                    ? "border border-black"
                    : "border border-gray"
                }`}
                onClick={() => {
                  setUT("reviewer");
                }}
              >
                Reviewer
              </Button>
              <Button
                className={`w-1/3 rounded-l-none ${
                  userType === "educator"
                    ? "border border-black"
                    : "border border-gray"
                }`}
                onClick={() => {
                  setUT("educator");
                }}
              >
                Teacher
              </Button>
            </div>
            <form onSubmit={handleLogIn} className="text-black space-y-6">
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
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Link
                href="/reset-password"
                className="block text-right text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>

              <Button
                className="w-full bg-teal-600 text-black text-lg"
                disabled={loading}
              >
                {loading ? "Verifying your credentials..." : "Login"}
              </Button>
            </form>
            <div className="text-center">
              {/* SignUp link */}
              New User?
              <Link
                className="ml-1 text-md text-blue-600 hover:underline"
                href="/signup"
              >
                SignUp!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
