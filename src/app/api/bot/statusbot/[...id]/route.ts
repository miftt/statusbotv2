import { getStatusBotPublicAPI } from "@/lib/prisma/service"
import { NextResponse } from "next/server"

export const GET = async (req: Request, { params } : {params: {id: string}}) => {
    if(!params.id[0]){
        return NextResponse.json({
            status: false,
            statusCode: 400,
            message: 'Invalid request'
        }, { status: 400 })
    }else if(!params.id[1]){
        return NextResponse.json({
            status: false,
            statusCode: 400,
            message: 'Invalid request'
        }, { status: 400 })
    }
    const res = await getStatusBotPublicAPI(params.id[0], params.id[1]);
    return new NextResponse(res, { status: 200 })
}