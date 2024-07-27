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
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useState } from "react"

export default function LoginForm() {

  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        username: e.target.username.value,
        password: e.target.password.value,
        redirect: false,
        callbackUrl: "/"
      })
      if (!res?.error) {
        setIsLoading(false);
        toast.success('Login Success');
        push('/')
      }
      else {
        if (res?.status == 401) {
          toast.error('wrong username or password')
          setIsLoading(false);
        }
      }
    } catch (err) {
      toast.error('wrong username or password')
    }
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">

        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <form onSubmit={(e) => handleLogin(e)}>
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="username"
                    placeholder="DevGanteng"
                    required
                  />
                </div>
                <div className="grid gap-2 py-5">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link href="#" className="ml-auto inline-block text-sm underline">
                      Forgot your password?
                    </Link>
                  </div>
                  <Input id="password" type="password" placeholder="••••••••" required />
                </div>
                <Button type="submit" disabled={isLoading} className={isLoading ? "w-full cursor-not-allowed" : "w-full"}>
                  {isLoading ? "Login..." : "Login"}
                </Button>
              </form>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline">
                Sign up
              </Link>
            </div>

          </CardContent>
        </Card>
      </div>
    </>
  )
}