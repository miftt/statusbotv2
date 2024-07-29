import { getAuth } from "@/hooks/getAuth";
import { editUser } from "@/lib/prisma/service";
import { NextResponse } from "next/server";

export const PATCH = async (request: Request , {params} : {params: {id: string}}) => {
    const session = await getAuth();
    const body = await request.json();
    if(!session){
        return NextResponse.json({status: false, statusCode: 401, error: "Unauthorized"}, {status: 401});
    }else if(session?.user?.role !== "admin"){
        return NextResponse.json({status: false, statusCode: 401, error: "Unauthorized"}, {status: 401});
    }else{
        const res = await editUser(params.id, body);
        return NextResponse.json({message: res}, {status: 200});
    }
}