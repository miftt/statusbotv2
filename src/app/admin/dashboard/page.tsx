'use client'

import {
  Clipboard,
  File,
  ListFilter,
  MoreHorizontal,
  Search,
  Trash,
  UserPen,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
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
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import useSWR from "swr"
import SkeletonRow from "./skeleton"
import AddToken from "./addToken"
import AddUser from "./addUser"
import ChangeToken from "./changeToken"
import { Skeleton } from "@/components/ui/skeleton"

const fetcher = async(url: string) => fetch(url).then(res => res.json());

export default function AdminDashboardPage() {
    const {data,isLoading,mutate} = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/getuser`, fetcher)
    const users = data?.data?.data

    const usersWithToken = users?.filter((user: any) => user.token) || []
    const usersWithoutToken = users?.filter((user: any) => !user.token) || []

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger value="archived" className="hidden sm:flex">
                  Archived
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Archived
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="outline" className="h-7 gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button>
                <div>
                    {isLoading ? <Skeleton className="h-7 w-28"/> : <ChangeToken username={usersWithToken.map((user: any) =>
                        user.username
                    )} mutate={mutate}/>}
                </div>
                <div>
                  {isLoading ? <Skeleton className="h-7 w-28"/> : <AddToken username={usersWithoutToken.map((user: any) =>
                      user.username
                  )} mutate={mutate}/>}
                </div>
                <div>
                    <AddUser mutate={mutate}/>
                </div>
                {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="h-7 gap-1">
                    <CirclePlus className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Menu
                    </span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Add User</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <ShieldPlus className="mr-2 h-4 w-4" />
                        <AddToken />
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Pen className="mr-2 h-4 w-4" />
                        <span>Change Token</span>
                    </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
                </DropdownMenu> */}
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Table of users</CardTitle>
                  <CardDescription>
                    List of all the users
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-48 sm:table-cell">UserID</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden sm:table-cell">Token</TableHead>
                        <TableHead className="hidden sm:table-cell">Created at</TableHead>
                        <TableHead>Expire Date</TableHead>
                        <TableHead>
                          Actions
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {isLoading
                        ? Array.from({ length: 5 }).map((_, idx) => <SkeletonRow key={idx} />)
                        : users?.map((user: any) => (
                      <TableRow key={user?.id}>
                        <TableCell className="hidden w-48 sm:table-cell">
                          {user.id}
                        </TableCell>
                        <TableCell className="font-medium break-words">
                          {user.username}
                        </TableCell>
                        <TableCell className="break-words">
                          {user.role}
                        </TableCell>
                        <TableCell className="break-words">
                            <Badge variant={user.status === 'Aktif' ? 'success' : 'destructive'}>{user.status}</Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell break-words">
                          {user.token?.token || 'No token'}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell break-words">
                          {new Date(user.created_at).toLocaleDateString('id-ID')}
                        </TableCell>
                        <TableCell className="break-words">
                          {new Date(user.expireDate).toLocaleDateString('id-ID')}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem><Clipboard className="mr-2 h-4 w-4"/>Copy Token</DropdownMenuItem>
                              <DropdownMenuItem><UserPen className="mr-2 h-4 w-4"/>Edit</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-500"><Trash className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
