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
import { useState } from "react"
import axios from "axios"
import { toast } from "sonner"

export default function AddUser({ mutate } : {mutate: () => void}) {
  const [usernames, setUsernames] = useState('');
  const [passwords, setPasswords] = useState('');
  const [roles, setRoles] = useState('');
  const [status , setStatus] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) =>{
    setIsLoading(true);
    e.preventDefault();
    try{
      const res = await axios.post('/api/user/adduser',{
        username: usernames,
        password: passwords,
        role: roles,
        status: status
      })
      if(res.status === 200){
        toast.success('User added successfully');
        setUsernames('');
        setPasswords('');
        setRoles('');
        setStatus('');
      }else{
        toast.error('An unexpected error has occurred');
      }
    }catch(err){
      toast.error('username already exists');
    }finally{
      setIsLoading(false);
      setIsDialogOpen(false);
      mutate();
    }
  }
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}> <UserPlus className="mr-1 h-5 w-5"/>Add User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
      <form onSubmit={handleSubmitForm}>
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
              placeholder="username"
              value={usernames}
              onChange={(e) => setUsernames(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              placeholder="password"
              className="col-span-3"
              value={passwords}
              onChange={(e) => setPasswords(e.target.value)}
              type="password"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Status
            </Label>
            <Select required onValueChange={(value) => setStatus(value)}>
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
            <Select required onValueChange={(value) => setRoles(value)}>
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
          <Button type="submit" disabled={isLoading}>Save changes</Button>
        </DialogFooter>
    </form>
      </DialogContent>
    </Dialog>
  )
}
