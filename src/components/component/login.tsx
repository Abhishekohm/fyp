"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import ResetPass from "./resetPass";
import { useRouter } from "next/navigation";

export default function Login() {
  const [userType, setUT] = useState("educator");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("none");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const router = useRouter();


  const handleLogIn = async (e: any) => {  

    e.preventDefault();
    setLoading(true);
    if (!userName.trim() || !password.trim()) {
      setError("\t\t\t\t\t\t\t\t\t\t\t\tPlease fill in all fields.\t\t\t\t\t\t\t\t\t\t\t\t");
    setLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://fypbackend-production-d00d.up.railway.app/api/auth/login/`, {
        method: 'POST',
        // mode:'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userName,
          password: password,
          type: userType
        }),
      });
      if (response.ok) {
        let msg = await response.json();
        setError("none");
        console.log('User logged in successfully!',msg);
        const accessToken = msg.access_token;
        localStorage.setItem('accessToken', accessToken); // Store access token in local storage
        router.push('/dash');
      } 
      else {
        let msg = await response.text();
        console.error('Failed to login!!:', msg);
        setError(msg);
      }
    } 
    catch (error) {
      console.error('Error during login:', error);
    }
    finally {
      setLoading(false); // Close the dialog regardless of the outcome
  }
  };

  return (
    <div className="h-lvh">
      {/* Header and other JSX code */}
      <header className="flex items-center justify-between h-auto px-4 bg-white shadow-md">
        <div className="text-lg font-bold">MitraBot</div>
        <Button className="px-4 py-2 m-4 bg-blue-600 text-white rounded-md"><a href="/signup">Sign Up</a></Button>
      </header>
      <div className="flex  h-svh items-center justify-center bg-gray-800">
        <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-lg">
          <h1 className="text-center  text-2xl font-bold">Login to MitraBot!</h1>
          <div className="flex justify-between mb-4">
            {/* UserType buttons */}
            <Button className="w-1/2 rounded-r-none hover:none" onClick={()=>{setUT("educator")}} variant={userType === "learner" ? 'outline' : 'secondary'}>
              Educator
            </Button>
            <Button className="w-1/2 b-gray rounded-l-none " onClick={()=>{setUT("learner")}} variant={userType === "learner" ? 'secondary' : 'outline'} >
              Learner
            </Button>            
          </div>
          <form onSubmit={handleLogIn} className="space-y-6">
            {/* Input fields */}
            <div>
              <Input className="bg-white text-black" placeholder="User Name" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div>
              <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Link href="#" onClick={(e) => { e.preventDefault(); setShowResetDialog(true); }} className="block text-right text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link>

            {error!== "none" && <span>Error: {error.slice(12,-2)}</span> }

            <Button className="w-full text-white bg-black" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</Button>
          </form>
          <div className="text-center">
            {/* SignUp link */}
            New User? 
            <Link className="ml-1 text-md text-blue-600 hover:underline" href="/signup">
              SignUp!
            </Link>
          </div>
        </div>
      </div>
      {/* Reset password dialog */}
      {showResetDialog && <ResetPass onClose={() => setShowResetDialog(false)} />}
    </div>
  );
}
