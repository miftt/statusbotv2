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
import axios from "axios"
import { UserPen } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface TokenProps {
  username: any,
  mutate: () => void
}

const ChangeToken: React.FC<TokenProps> = ({ username, mutate }) => {
  const [usernames, setUsernames] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tokens, setTokens] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post('/api/user/token/changetoken', {
        username: usernames,
        token: tokens
      });
      if (res.status === 200) {
        toast.success('Token changed successfully');
      } else {
        toast.error('An unexpected error has occurred');
      }
    } catch (err) {
      toast.error('Please select a user');
    } finally {
      setIsLoading(false);
      setUsernames('');
      setTokens('');
      setIsDialogOpen(false);
      mutate();
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}> <UserPen className="mr-1 h-5 w-5" />Change Token</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change User Token</DialogTitle>
          <DialogDescription>
            Change user token here.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Select required onValueChange={(value) => setUsernames(value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {username.map((user: string) => (
                    <SelectItem key={user} value={user}>
                      {user}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="token" className="text-right">
                Token
              </Label>
              <Input
                id="token"
                className="col-span-3"
                placeholder="Insert new token"
                required
                value={tokens}
                onChange={(e) => setTokens(e.target.value)}
              />
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

export default ChangeToken;
