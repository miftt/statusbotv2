import { authOptions } from "@/lib/authOptions/authOptions"
import { addUser } from "@/lib/prisma/service";
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const session = await getServerSession(authOptions);
    const body = await request.json();
    if(!session) {
        return NextResponse.json({
            status: false,
            statusCode: 401,
            error: "Unauthorized"
        }, { status: 401});
    }else if(session?.user?.role !== "admin") {
        return NextResponse.json({
            status: false,
            statusCode: 401,
            error: "Unauthorized"
        }, { status: 401});
    }else{
        try{
            const res: any = await addUser(body)
            if(res.status === false) {
                return NextResponse.json({
                    status: false,
                    statusCode: 400,
                    message: res.message
                },
                    { status: 400 }
                );
            }else if(res.status === true) {
                return NextResponse.json({
                    status: true,
                    statusCode: 200,
                    message: res.message,
                    username: res.data?.username
                }, 
                    { status: 200 }
                );
            }
        }catch(err) {
            return NextResponse.json({
                status: false,
                error: err
            }, { status: 500});
        }
    }

}