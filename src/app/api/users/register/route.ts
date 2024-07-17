import { connect } from '@/lib/mongodb'
import User from '@/lib/user'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'

connect()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const { username, email, password } = reqBody
        await User.findOne({ email }).then(user => {
            if (user) {
                return NextResponse.json({ email: "Email already exists" }, { status: 400 })
            } else {
                const newUser = new User({
                    username,
                    email,
                    password
                })

                bcryptjs.genSalt(10, (err, salt) => {
                    bcryptjs.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then((user: any) => NextResponse.json(user))
                            .catch((err: any) => console.log(err));
                    });
                });
            }
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}