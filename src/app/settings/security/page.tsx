'use client'

import Link from "next/link"
import { CircleUser, Menu, Package2, Search } from "lucide-react"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { SyntheticEvent, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"


export function SettingsPage() {
  const {data: session} = useSession();
  console.log(session)
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const changePassword = async(e: SyntheticEvent) =>{
    setIsLoading(true);
    e.preventDefault();
    try{
      await axios.patch(`/api/user/change-password/${session?.user?.id}`, {
        oldPassword: oldPassword,
        newPassword: password
      })
      toast.success('Password changed successfully');
      router.refresh();
    }catch(error){
      if(axios.isAxiosError(error)){
        toast.error('Wrong old password')
      } else{
        toast.error('An unexpected error has occurred')
      }
    }
    setIsLoading(false);
  }
  
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Orders
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Products
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Customers
          </Link>
          <Link
            href="#"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Settings
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Dashboard
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Orders
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Products
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Customers
              </Link>
              <Link href="#" className="hover:text-foreground">
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
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
            <Link href={"/settings/profile"} className="font-semibold">
              Profile
            </Link>
            <Link href="#" className="font-semibold text-primary">Security</Link>
          </nav>
          <div className="grid gap-6">
            <form onSubmit={(e)=> changePassword(e)}>
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Secret Token</CardTitle>
                <CardDescription>
                  Message admin to set or reset your secret token.
                </CardDescription>
              </CardHeader>
              <CardContent>
                  <Input disabled placeholder="••••••••" />
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button disabled className="cursor-not-allowed">Save</Button>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-04-chunk-2" className="mt-4">
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here.
                </CardDescription>
              </CardHeader>
              <CardContent>
                  <CardDescription className="ml-1 text-sm text-primary">Old Password</CardDescription>
                  <Input required value={oldPassword} onChange={(e)=> setOldPassword(e.target.value)} type="password" placeholder="••••••••" />
              </CardContent>
              <CardContent>
                  <CardDescription className="ml-1 text-sm text-primary">New Password</CardDescription>
                  <Input required value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="••••••••" />
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

export default SettingsPage;