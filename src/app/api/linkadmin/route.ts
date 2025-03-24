import { connect } from '@/lib/mongodb'
import Link from '@/utils/db/links'
import User from '@/utils/db/user'
import mongoose from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'

await connect()

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
            return NextResponse.json({ error: 'ID not found' }, { status: 400 });
        }

        if (!mongoose.isValidObjectId(id)) {
            return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
        }

        const user = await User.findById(id).populate('link').exec();
        return NextResponse.json({link: user.link, username: user.username}, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}

export async function PUT(req: NextRequest) {
    const reqBody = await req.json()
    const { id, name, url } = reqBody

    console.log('Filtered', { id, name, url })

    const link = await Link.findOne({ _id: id });
    console.log('Matched document:', link);

    try {
        const editLink = await Link.findOneAndUpdate({ _id: id }, { $set: { name, url } })
        return NextResponse.json(editLink, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    const reqBody = await req.json()
    const { id } = reqBody

    try {
        const deleteLink = await Link.deleteOne({ _id: id })
        return NextResponse.json(deleteLink, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}