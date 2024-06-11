import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import bcryptjs from 'bcryptjs';
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { makeLog } from "@/server/factories/make-log";


const schema = z.object({
    username: z.string().min(3),
    email: z.string().email(), 
    password: z.string().min(8)
}) 

export async function POST(req:NextRequest,res:NextResponse){
    const body = await req.json()
    try{

        const data = schema.parse(body)


        const formattedData = {
            ...data, 
            password: bcryptjs.hashSync(data.password, 8)
        }


        const userExists = await db.query.users.findFirst({
            where: (user) => eq(user.email, data.email)
        })


        if(userExists){
            await makeLog(req, 400, body)
            return NextResponse.json({
                err: 'User already exists'
            }, {
                status:400
            })
        }


        await db.insert(users).values(formattedData)

        await makeLog(req, 201, body)
        return NextResponse.json({}, {status:201})

    } catch(err){
        await makeLog(req, 500, body)
        return NextResponse.json(err)
    }
}; 