import { connect } from '@/lib/mongodb'
import Link from '@/utils/links'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(req: NextRequest){
    try {
        const reqBody = await req.json()
        const { name, url } = reqBody
        const newLinks = new Link({
            name,
            url
        })
        newLinks.save()
            .then((link: any) => NextResponse.json(link))
            .catch((err: any) => console.log(err))
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}