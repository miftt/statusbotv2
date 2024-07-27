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
import { CalendarIcon, UserPen } from "lucide-react"
import { useCallback, useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"

interface EditProps {
    id: string
    username: string
    role: string
    status: string
    expireDate: any
    mutate: () => void
}

const EditUser: React.FC<EditProps> = ({
    id,
    username,
    status,
    role,
    expireDate,
    mutate
}) => {

    const [usernames, setUsernames] = useState(username);
    const [passwords, setPasswords] = useState('');
    const [roles, setRoles] = useState(role);
    const [statuss, setStatuss] = useState(status);
    const [expireDates, setExpireDates] = useState(expireDate);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            const res = await axios.patch(`/api/user/edituser/${id}`, {
                username: usernames,
                password: passwords,
                role: roles,
                status: statuss,
                expireDate: expireDates
            })
            if (res.status === 200) {
                toast.success('User updated successfully');
                setUsernames(usernames);
                setPasswords('');
                setRoles(roles);
                setStatuss(statuss);
            } else {
                toast.error('An unexpected error has occurred');
            }
        } catch (err) {
            toast.error('username already exists');
        } finally {
            setIsLoading(false);
            setIsDialogOpen(false);
            mutate();
        }
    }
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <div className='hover:bg-muted-foreground/20 relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                 inset && "pl-8'>
                    <UserPen className='mr-2 h-4 w-4' />
                    <span>Edit</span>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmitForm}>
                    <DialogHeader>
                        <DialogTitle>Edit "{username}" data</DialogTitle>
                        <DialogDescription>
                            Edit user data here
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
                            <Select onValueChange={(value) => setStatuss(value)}>
                                <SelectTrigger className="col-span-2">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent position="popper" defaultValue={statuss}>
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
                            <Select onValueChange={(value) => setRoles(value)}>
                                <SelectTrigger className="col-span-2">
                                    <SelectValue placeholder="Select Role" />
                                </SelectTrigger>
                                <SelectContent position="popper" defaultValue={roles}>
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
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Expire Date
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[280px] justify-start text-left font-normal",
                                            !expireDates && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {expireDates ? format(expireDates, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={expireDates}
                                        onSelect={setExpireDates}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
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

export default EditUser;