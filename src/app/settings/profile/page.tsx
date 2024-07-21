'use client'

import Link from "next/link"
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

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
          <h1 className="text-md text-muted-foreground">Manage your account settings and set secret token</h1>
          <Separator className="mt-4"/>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
          >
            <Link href="#" className="font-semibold text-primary">
              Profile
            </Link>
            <Link href={'/settings/security'}>Security</Link>
          </nav>
          <div className="grid gap-6">
            <form>
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Username</CardTitle>
                <CardDescription>
                  Used to identify your account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                  <Input disabled placeholder="verstappen" />
              </CardContent>
              <CardHeader>
                <CardTitle>Email</CardTitle>
                <CardDescription>
                  Email of your account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                  <Input disabled placeholder="verstappen@m.com" />
              </CardContent>
              <CardHeader>
                <CardTitle>Role</CardTitle>
                <CardDescription>
                  Role of your account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                  <Input disabled placeholder="user" />
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
              </CardFooter>
            </Card>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}