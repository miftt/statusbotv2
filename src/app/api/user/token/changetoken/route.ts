import { changeToken } from "@/lib/prisma/service";
import { NextResponse } from "next/server";
import { getAuth } from "@/hooks/getAuth";

export const POST = async (request: Request) => {
    const session = await getAuth();
    const body = await request.json();
    if(!session) {
        return NextResponse.json({
            status: false,
            statusCode: 401,
            error: "Unauthorized"
        },
        {status: 401})
    }else if(session?.user?.role !== "admin"){
        return NextResponse.json({
            status: false,
            statusCode: 401,
            error: "Unauthorized"
        },
        {status: 401})
    }else{
        const res = await changeToken(body.username, body.token)
        if(res.status === false){
            return NextResponse.json({
                status: false,
                statusCode: 400,
                message: res.message
            })
        }else if(res.status === true){
            return NextResponse.json({
                data: res
            })
        }
    }
}