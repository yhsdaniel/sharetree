import { connect } from '@/lib/mongodb'
import User from '@/lib/user'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt, { hash } from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(req: NextRequest, res: NextResponse) {
    const reqBody = await req.json()
    const { email, password } = reqBody;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 403 });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json({ error: 'Invalid Password' }, { status: 403 });
        }

        // Create JWT Payload
        const payload = {
            id: user.id,
            name: user.name
        };

        // Sign Token
        const token = jwt.sign(payload, 'secret');

        const cookieCheck = req.cookies.get('access_token');

        if (cookieCheck === undefined) {
            return NextResponse.json({ token }, { status: 200 });
        } else {
            // If token already exists, you might want to handle it differently.
            // Here, we just return the token again.
            return NextResponse.json({ token }, { status: 200 });
        }

    } catch (error) {
        // Handle any unexpected errors
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}