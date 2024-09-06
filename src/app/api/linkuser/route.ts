import { connect } from "@/lib/mongodb";
import User from '@/utils/db/user';
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";


export async function GET(req: NextRequest) {
    await connect()
    try {
        const { searchParams } = new URL(req.url);
        const username = searchParams.get('username');

        if (!username) {
            return NextResponse.json({ error: 'Username not found' }, { status: 400 });
        }

        const userName = await User.findOne({ username: username })
        if (!mongoose.isValidObjectId(userName._id)) {
            return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
        }

        const user = await User.findById(userName._id.toString()).populate('link').exec();
        return NextResponse.json(user.link, { status: 200 });
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}