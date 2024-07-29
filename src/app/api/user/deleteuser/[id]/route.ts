import { getAuth } from "@/hooks/getAuth";
import { deleteUser } from "@/lib/prisma/service";
import { NextResponse } from "next/server";

export const DELETE = async (request: Request, {params} : {params: {id: string}}) => {
    const session = await getAuth();
    if(!session){
        return NextResponse.json({
            status: false,
            statusCode: 401,
            error: "Unauthorized"
        }, {
            status: 401
        })
    }else if(session?.user?.role !== "admin"){
        return NextResponse.json({
            status: false,
            statusCode: 401,
            error: "Unauthorized"
        }, {
            status: 401
        })
    }else{
        const res = await deleteUser(params.id);
        if(res.status === false){
            return NextResponse.json({
                status: false,
                statusCode: 400,
                message: res.message
            }, {
                status: 400
            })
        }else if(res.status === true){
            return NextResponse.json({
                status: res.status,
                statusCode: 200,
                message: res.message,
                username: res.data?.username
            })
        }
    }
}