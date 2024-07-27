import { register } from '@/lib/prisma/service'
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
    const req = await request.json();
    const res = await register(req);
    return NextResponse.json({
        status: res.status,
        message: res.message
    },
    {
        status: res.statusCode
    });
}