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
import { ShieldPlus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

interface TokenProps {
  username: any
  mutate: () => void
}

const AddToken: React.FC<TokenProps> = ({ username, mutate }) => {
  const [usernames, setUsernames] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tokens, setTokens] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post('/api/user/token/addtoken', {
        username: usernames,
        token: tokens
      });

      if (res.status === 200) {
        toast.success('Token added successfully');
      } else {
        toast.error('An unexpected error has occurred');
      }
    } catch (err) {
      toast.error('This user already has a token');
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
        <div className='hover:bg-muted-foreground/20 relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-8'>
          <ShieldPlus className='mr-2 h-4 w-4' />
          <span>Add Token</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Token User</DialogTitle>
          <DialogDescription>
            Add user token here.
            {username.length === 0 && <span className="flex text-red-600 text-sm">All user has a token!</span>}
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

export default AddToken;
