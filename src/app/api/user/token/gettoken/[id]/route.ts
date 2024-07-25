import { authOptions } from "@/lib/authOptions/authOptions";
import { getToken } from "@/lib/prisma/service";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (request: Request, {params} : {params: {id: string}}) => {
    const session = await getServerSession(authOptions);
    
    if(!session){
        return NextResponse.json({error: 'Must be logged in'}, {status: 401});
    }else if(session?.user?.id !== params.id){
        return NextResponse.json({error: 'The session id not match with the user id'}, {status: 401});
    }else{
        const res = await getToken(params.id);
        return NextResponse.json({
            status: 200,
            data: res
        },{
            status: 200
        });
    }
}