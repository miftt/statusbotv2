import { getAuth } from "@/hooks/getAuth";
import { changePassword } from "@/lib/prisma/service";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request, {params}: {params: {id: string}}) =>{
    const body = await req.json();
    const session = await getAuth();

    const data = {
        newPassword: body.newPassword,
        oldPassword: body.oldPassword
    };
    if(session == null){
        return NextResponse.json({status: false, statusCode: 401, error: "Unauthorized"}, {status: 401});
    }else if(session?.user?.id !== params.id){
        return NextResponse.json({status: false, statusCode: 401, error: "Unauthorized"}, {status: 401});
    }else{
        try{
            const res = await changePassword(session?.user?.id, data.newPassword, data.oldPassword)
            if(res?.statusCode === 400){
                return NextResponse.json({error: res.message}, {status: res.statusCode});
            }else if(res?.statusCode === 200){
                return NextResponse.json({message: res.message}, {status: res.statusCode});
            }
            return NextResponse.json(res, {status: res.statusCode});
        }catch(error){
            return NextResponse.json({error: error}, {status: 500});
        }
    }
}