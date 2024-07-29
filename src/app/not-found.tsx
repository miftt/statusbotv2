import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='flex flex-col h-screen w-full items-center justify-center'>
            <h1 className="text-9xl font-bold">404</h1>
            <h1 className='text-3xl'>Not Found!</h1>
            <Button size={'lg'}>
                <Link href="/" className="text-3xl">Go Home</Link>
            </Button>
        </div>
    )
}