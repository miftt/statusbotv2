'use client'

import Link from "next/link"
import axios from "axios"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { SyntheticEvent, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import swr from 'swr'

const fetcher = async (url: string) => fetch(url).then(res => res.json());

export default function SettingsPage() {
  const { data: session } = useSession();
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { data } = swr(`${process.env.NEXT_PUBLIC_API_URL}/api/user/token/gettoken/${session?.user?.id}`, fetcher);
  const shortedToken = data?.data?.data?.token;

  const copyToClipboard = async (token: string) => {
    try {
      await navigator.clipboard.writeText(token);
      toast.success('Token copied to clipboard');
    } catch (error) {
      toast.error('An unexpected error has occurred');
    }
  }

  const changePassword = async (e: SyntheticEvent) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      await axios.patch(`/api/user/change-password/${session?.user?.id}`, {
        oldPassword: oldPassword,
        newPassword: password
      })
      toast.success('Password changed successfully');
      setOldPassword('');
      setPassword('');
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error('Wrong old password')
      } else {
        toast.error('An unexpected error has occurred')
      }
    }
    setIsLoading(false);
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
          <h1 className="text-md text-muted-foreground">Manage your account settings and set secret token</h1>
          <Separator className="mt-4" />
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
          >
            <Link href={"/settings/profile"} className="font-semibold">
              Profile
            </Link>
            <Link href="#" className="font-semibold text-primary">Security</Link>
          </nav>
          <div className="grid gap-6">

            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Secret Token</CardTitle>
                <CardDescription>
                  Message admin to set or reset your secret token.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input disabled placeholder={shortedToken || 'Not set by admin | contact admin'} value={shortedToken || ''} type={!shortedToken ? "text" : "password"} />
                <Button onClick={() => copyToClipboard(shortedToken)} className="mt-4 bg-slate-200 text-black" variant="outline">Copy</Button>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button disabled className="cursor-not-allowed">Save</Button>
              </CardFooter>
            </Card>
            <form onSubmit={(e) => changePassword(e)}>
              <Card x-chunk="dashboard-04-chunk-2" className="mt-4">
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CardDescription className="ml-1 text-sm text-primary">Current Password</CardDescription>
                  <Input required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} type="password" placeholder="••••••••" />
                </CardContent>
                <CardContent>
                  <CardDescription className="ml-1 text-sm text-primary">New Password</CardDescription>
                  <Input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" />
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button disabled={isLoading} type="submit">Save</Button>
                </CardFooter>
              </Card>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}