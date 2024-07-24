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
import { ShieldPlus } from "lucide-react"

export default function ChangeToken() {
  return (
    <form>
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}> <ShieldPlus className="mr-1 h-5 w-5"/>Add Token</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Token User</DialogTitle>
          <DialogDescription>
            Add user token here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Select required>
              <SelectTrigger className="col-span-2">
                <SelectValue placeholder="Select user" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="mifuzi">
                  mifuzi
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Token
            </Label>
            <Input
              id="username"
              className="col-span-3"
              placeholder="Insert new token"
              required
            />
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
