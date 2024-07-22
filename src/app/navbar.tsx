'use client'

import Link from "next/link"
import {
  CircleUser,
  Menu,
  Package2,
  Search,
} from "lucide-react"

import { Button } from "@/components/ui/button"
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
import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { signOut, useSession } from "next-auth/react"
import { useTheme } from "next-themes"
import { toast } from "sonner"
import { usePathname } from "next/navigation"

export default function Navbar() {
    const pathname = usePathname();
    const isActive = (path: string) => {
        if (path.endsWith('/**')) {
            const basePath = path.slice(0, -3); // Remove '/**' from the end
            return pathname.startsWith(basePath) ? 'text-foreground' : 'text-muted-foreground';
        }
        return pathname === path ? 'text-foreground' : 'text-muted-foreground';
    }
    const {data: session, status} = useSession();
    const { setTheme } = useTheme();
    
    const [isLoading, setIsLoading] = useState(false)
    const handleLogout = async () => {
      setIsLoading(true);
      toast.success('Logout Success');
      await new Promise((r) => setTimeout(r, 1000));
      signOut();
      setIsLoading(false);
    }
  
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
          </Link>
          <Link
            href="/"
            className={`${isActive('/')} transition-colors hover:text-foreground`}
          >
            Dashboard
          </Link>
          <Link
            href={'/listbot'}
            className={`${isActive('/listbot')} transition-colors hover:text-foreground`}
          >
            ListBot
          </Link>
          <Link
            href="/itemlist"
            className={`${isActive('/itemlist')} transition-colors hover:text-foreground`}
          >
            ListItems
          </Link>
          <Link
            href="#"
            className={`${isActive('/dashboard')} transition-colors hover:text-foreground`}
          >
            Customers
          </Link>
          <Link
            href="#"
            className={`${isActive('/dashboard')} transition-colors hover:text-foreground`}
          >
            Analytics
          </Link>
          <Link
            href={'/settings/profile'}
            className={`${isActive('/settings/**')} transition-colors hover:text-foreground`}
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
              </Link>
              <Link href="#" className="hover:text-foreground">
                Dashboard
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                ListBot
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Item List
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Customers
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Analytics
              </Link>
              <Link
                href={'/settings/profile'}
                className="text-muted-foreground hover:text-foreground"
              >
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto flex-1 sm:flex-initial">
           
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {session?.user?.username}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Link className="cursor-default" href={"/settings/profile"}>Settings</Link></DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              {status === 'authenticated' ?  (
                <DropdownMenuItem disabled={isLoading} onClick={handleLogout}>
                    Logout
                </DropdownMenuItem>
              ):(
                <DropdownMenuItem>
                  <Link className="cursor-default" href="/login">Login</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    )
}