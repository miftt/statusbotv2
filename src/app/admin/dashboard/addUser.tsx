'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus } from "lucide-react"

export default function AddUser() {
  return (
    <form>
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}> <UserPlus className="mr-1 h-5 w-5"/>Add User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription>
            Add user here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Username
            </Label>
            <Input
              id="username"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              className="col-span-3"
              type="password"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Status
            </Label>
            <Select required>
              <SelectTrigger className="col-span-2">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="Aktif">
                  Aktif
                </SelectItem>
                <SelectItem value="Nonaktif">
                  Nonaktif
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Role
            </Label>
            <Select required>
              <SelectTrigger className="col-span-2">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="admin">
                  Admin
                </SelectItem>
                <SelectItem value="gold">
                  Gold
                </SelectItem>
                <SelectItem value="user">
                  User
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </form>
  )
}
