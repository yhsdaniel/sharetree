import { connect } from '@/lib/mongodb'
import User from '@/utils/user'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'

connect()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const { username, email, password } = reqBody
        const existUser = await User.findOne({ email }).exec()
        if (existUser) return NextResponse.json({ error: 'Email already exists' }, { status: 400 })
    
        const salt = await bcryptjs.genSalt(10)
        const hash = await bcryptjs.hash(password, salt)
        const newUser = new User({
            username,
            email,
            password: hash,
        })
    
        try {
            await newUser.save()
            return NextResponse.json(newUser, { status: 200 })
        } catch (error) {
            console.log(error)
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}