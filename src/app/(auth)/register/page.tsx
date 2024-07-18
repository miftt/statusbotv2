'use client'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleRegister = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch('api/auth/register',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value
      })
    })
    if(res.status === 200){
        e.target.reset();
        setIsLoading(false);
        toast.success('Register Success');
        router.push('/login');
    }else{
        toast.error('username already exists');
        setIsLoading(false);
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center">
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e)=> handleRegister(e)}>
            <div className="grid gap-4">
                <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="verstappen" required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
                Create an account
            </Button>
            <Button variant="outline" className="w-full">
                Sign up with Google
            </Button>
            </div>
            <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
                Sign in
            </Link>
            </div>
        </form>
      </CardContent>
    </Card>
    </div>
  )
}
