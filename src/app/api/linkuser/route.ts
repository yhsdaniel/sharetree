import { connect } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import User from '@/utils/db/user';
import Link from '@/utils/db/links';

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
    await connect()

    try {
        const { searchParams } = new URL(req.url);
        const username = searchParams.get('username');

        console.log('Link model loaded:', !!Link);

        if (!username) {
            return NextResponse.json({ error: 'Username is required' }, { status: 400 });
        }
        
        const userName = await User.findOne({ username: username })

        if (!userName || !mongoose.isValidObjectId(userName._id)) {
            return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
        }
        
        const user = await User.findById(userName._id).populate('link').exec();
        return NextResponse.json(user?.link || [], { status: 200 });
        
    } catch (error) {
        console.log('Error fetching user link: ', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}