import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface DeleteProps {
    id: string
    mutate: () => void
    username: string
}

const DeleteUser: React.FC<DeleteProps> = ({
    id,
    mutate,
    username
}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async (userId: string) => {
        setIsLoading(true);
        try {
            const res = await axios.delete(`/api/user/deleteuser/${userId}`, {
                headers: {
                    "Content-Type": "application/json"
                },
            });
            if (res.status === 200) {
                toast.success(`User ${username} has been deleted`);
            } else {
                toast.error('An unexpected error has occurred');
            }
        } catch (err) {
            toast.error('This user not found');
        } finally {
            setIsLoading(false);
            setIsDialogOpen(false);
            mutate();
        }
    }
    return (
        <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
            <DialogTrigger asChild>
                <div className='text-red-500 hover:bg-muted-foreground/20 relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                 inset && "pl-8'>
                    <Trash className='mr-2 h-4 w-4' />
                    <span>Delete User</span>
                </div>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Are you sure you want to delete {username.toUpperCase()}?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button size='sm' variant='secondary'>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button disabled={isLoading} size='sm' variant='destructive' onClick={() => handleDelete(id)}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteUser;
