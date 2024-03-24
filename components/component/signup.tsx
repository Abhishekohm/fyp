"use client";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { redirect } from 'next/navigation'
import { useState } from "react"

export default function Signup() {

  const backendUrl = process.env.BACKEND_DOMAIN;
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("none");
  const [password, setPassword] = useState("");
  const [userType, setUT] = useState("Student");
  // console.log(backendUrl);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://fypbackend-production-d00d.up.railway.app/api/auth/register/`, {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userName,
        password: password,
        email: email,
        }),
      });
      if (response.ok) {
        setError("none");
        // Handle successful registration, e.g., redirect to login page
        console.log('User registered successfully!');
        //redirect
        window.location.href = '/login';
      } 
      else {
        let msg = await response.text();
        console.error('Registration failed!:', msg);
        setError(msg);
      }
    } 
    catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="h-lvh">
      <header className="flex items-center justify-between h-auto px-4 bg-white shadow-md">
        <div className="text-lg font-bold">MitraBot</div>
        <Button className="px-4 py-2 m-4 bg-blue-600 text-white rounded-md"><a href="/login">Log In</a></Button>
      </header>
      <div className="flex  h-svh items-center justify-center bg-gray-800">
        <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-lg">
          <h1 className="text-center text-2xl font-bold">Sign Up to MitraBot!</h1>
          <div className="flex justify-between mb-4">
            <Button className="w-1/2 rounded-r-none " onClick={()=>{setUT("Student")}} variant={userType === "Student" ? 'secondary' : 'outline'} >
              Student
            </Button>
            <Button className="w-1/2 rounded-l-none " onClick={()=>{setUT("Teacher")}} variant={userType === "Student" ? 'outline' : 'secondary'}>
              Teacher
            </Button>
          </div>

          <form onSubmit={handleSignUp} className="space-y-6">
          <div>
              <Input placeholder="User Name" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div>
              <Input placeholder="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {/* Additional fields and buttons for user registration */}
            {/* For example, you might want to include a dropdown for user type */}

            {error!== "none" && <span>Error: {error.slice(12,-2)}</span> }

            <Button className="w-full" type="submit">Sign Up</Button>
          </form>

          <div className="text-center">
          Already a User? 
            <Link className="ml-1 text-md text-blue-600 hover:underline" href="/login">
              Log In!
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
