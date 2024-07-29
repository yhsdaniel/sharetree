import User from "@/utils/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const username = searchParams.get('username');

        if (!username) {
            return NextResponse.json({ error: 'Username not found' }, { status: 400 });
        }

        const user = await User.find({ username }).populate('link').exec();

        if (user.length === 0) {
            return NextResponse.json({ error: 'No users found' }, { status: 404 })
        }

        const links = user.map(u => u.link)

        return NextResponse.json(links, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}