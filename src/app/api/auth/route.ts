import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import bcryptjs from 'bcryptjs';
import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { env } from "@/env";
import { sign } from "@/server/jwt";
import { makeLog } from "@/server/factories/make-log";


const schema = z.object({
    email: z.string().email(), 
    password: z.string().min(8)
}) 

export async function POST(req:NextRequest,res:NextResponse){

    const body = await req.json()

    try{
        const data = schema.parse(body)

        const user = await db.query.users.findFirst({
            where: (user) => eq(user.email, data.email)
        })

        console.log(user)


        if(!user){
            await makeLog(req, 400, body)
            return NextResponse.json({
                err: 'User do not exists or wrong password.'
            }, {
                status:400
            })
        }


        const isValidPassword = bcryptjs.compareSync(data.password, user.password)

        if(!isValidPassword){
            await makeLog(req, 400, body)
            return NextResponse.json({
                err: 'User do not exists or wrong password.'
            }, {
                status:400
            })
        }

        const token = await sign({
            sub:user.id
        },  env.JWT_SECRET)

        await makeLog(req, 200, body)

        return NextResponse.json({token}, {status:200})
    } catch(err){
        return NextResponse.json(err)
    }
}