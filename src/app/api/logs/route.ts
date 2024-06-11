import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { makeLog } from "@/server/factories/make-log";


export async function GET(req:NextRequest,res:NextResponse){
    const data = await db.query.logs.findMany()
    await makeLog(req, 200)
    return NextResponse.json(data)
}
