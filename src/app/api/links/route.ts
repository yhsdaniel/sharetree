import { connect } from '@/lib/mongodb'
import Link from '@/utils/links'
import User from '@/utils/user'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const { name, url, owner } = reqBody
        let user = await User.findOne({ email: owner })
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        const newLinks = new Link({
            name,
            url,
            owner: user._id
        })
        await newLinks.save()

        // Add and update link to user
        user.link.push(newLinks._id)
        await user.save()
        return NextResponse.json(newLinks, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        
        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const user = await User.findById(id).populate('link').exec();
        return NextResponse.json(user.link, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}