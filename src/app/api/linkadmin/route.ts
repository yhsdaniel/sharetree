import { authOptions } from '@/lib/auth'
import { connect } from '@/lib/mongodb'
import Link from '@/utils/db/links'
import User from '@/utils/db/user'
import mongoose from 'mongoose'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

await connect()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const { name, url } = reqBody

        const session = await getServerSession(authOptions);

        let user = await User.findOne({ username: session?.user?.username })
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
        return NextResponse.json({ link: user.link, username: user.username }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}

export async function PUT(req: NextRequest) {
    const reqBody = await req.json()
    const { id, name, url } = reqBody

    const link = await Link.findOne({ _id: id });

    try {
        if (link) {
            const editLink = await Link.findOneAndUpdate({ _id: id }, { $set: { name, url } })
            return NextResponse.json(editLink, { status: 200 })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    const reqBody = await req.json()
    const { userId, id } = reqBody

    if (!id || !userId) {
        return NextResponse.json({ error: "Missing id or userId" }, { status: 400 });
    }

    try {
        const objectId = new mongoose.Types.ObjectId(id);
        // const deleteLink = await Link.deleteOne({ _id: objectId })

        await User.updateOne(
            { _id: userId },
            { $pull: { link: objectId } }
        )

        return NextResponse.json({ message: "Link deleted successfully" }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}