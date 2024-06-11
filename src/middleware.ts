import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { headers } from "next/headers";
import { verify } from './server/jwt';
import { env } from './env';


export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/api/logs')) {

    const headersList = headers();
    const referer = headersList.get("authorization");
    const token = referer?.split(" ")[1];


    if(!token){
        return NextResponse.json({err: 'Token is missing.'}, {status: 401})
    }

    try{
        await verify(token, env.JWT_SECRET)
    } catch{
        return NextResponse.json({err: 'Invalid Token.'}, {status: 401})
    }

    return NextResponse.next()
    }
}

