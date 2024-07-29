import { getAllUser } from "@/lib/prisma/service";
import { NextResponse } from "next/server";
import { getAuth } from "@/hooks/getAuth";

export const GET = async () => {
    const session = await getAuth();
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