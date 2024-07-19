import { authOptions } from "@/lib/authOptions/authOptions";
import { getAllUser } from "@/lib/prisma/service";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
    const session = await getServerSession(authOptions);
    if(!session){
        return NextResponse.json({error: 'Must be logged in'}, {status: 401});
    }else if(session?.user?.role !== 'admin'){
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }else{
        const res = await getAllUser();
        return NextResponse.json({
            data: res
        },{
            status: 200
        });
    }
    }