import { NextRequest } from "next/server";
import { db } from "../db";
import { logs } from "../db/schema";


export async function makeLog(req:NextRequest, status:number, body:any = ''){

    try{
        const ip = req.headers.get("x-real-ip") ?? "127.0.0.1"

        const pathname = req.nextUrl.pathname

        const byteSize = Buffer.byteLength(JSON.stringify(body), 'utf8')

        await db.insert(logs).values({
            ip,
            pathname,
            dataLength: byteSize > 2 ? byteSize + 'B' : undefined,
            statusReq: String(status),
        })  
    }   catch(err){
        console.log(err)
    }  
}