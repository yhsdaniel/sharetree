import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { gql } from 'graphql-tag'
import { connect } from '@/lib/mongodb'
import Link from '@/utils/db/links'
import User from '@/utils/db/user'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextRequest } from 'next/server'

export const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        theme: String
        link: [Link]
    }

    type Link {
        _id: ID
        url: String
        name: String
    }

    type UpdateLinkOrderResponse {
        success: Boolean!
        links: [Link!]!
    }

    type Query {
        user(id: ID, username: String): User
        link(id: ID!): [Link]
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): User

        updateTheme(id: ID!, theme: String): User

        createLink(name: String!, url: String!): Link

        updateLink(id: ID!, name: String!, url: String!): Link

        updateLinkOrder(userId: ID!, orderedIds: [ID!]!): UpdateLinkOrderResponse

        deleteLink(userId: ID!, id: ID!): Boolean
    }
`

export const resolvers = {
    Query: {
        user: async (_parent: any, args: { id?: string; username?: string }, context: any) => {
            await connect();

            let user = null;

            // 🔹 Search by id
            if (args.id) {
                if (!mongoose.isValidObjectId(args.id)) {
                    throw new Error("Invalid ID format");
                }
                user = await User.findById(args.id)
                    .select("username theme link")
                    .populate("link", "name url");
            }

            // 🔹 Search by username
            if (!user && args.username) {
                user = await User.findOne({ username: args.username })
                    .select("username theme link")
                    .populate("link", "name url");
            }

            // 🔹 search by session
            if (!user && !args.id && !args.username) {
                const session = await getServerSession(authOptions);
                if (!session?.user?.username) throw new Error("Unauthorized");

                user = await User.findOne({ username: session.user.username })
                    .select("username theme link")
                    .populate("link", "name url");
            }

            if (!user) throw new Error("User not found");

            return { ...user.toObject(), theme: user.theme || "bg-gray-400" };
        }
    },
    Mutation: {
        createUser: async (_parent: any, args: { username: string; email: string; password: string }) => {
            await connect();

            // Check if user exists by email
            const existUser = await User.findOne({ email: args.email }).exec();
            if (existUser) {
                throw new Error('Email already exists');
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(args.password, salt);

            // Create new user
            const newUser = new User({
                username: args.username,
                email: args.email,
                password: hash,
            });

            try {
                await newUser.save();
                // Optionally, do not return password
                return {
                    _id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    link: newUser.link,
                };
            } catch (error) {
                throw new Error('Registration unsuccessful');
            }
        },
        updateTheme: async (_parent: any, args: { id: string, theme: string }) => {
            await connect()
            if (!mongoose.isValidObjectId(args.id)) {
                throw new Error('Invalid ID format')
            }
            const updateUser = await User.findByIdAndUpdate(
                { _id: args.id },
                { theme: args.theme },
                { new: true }
            )
            if (!updateUser) throw new Error('User not found')
            return updateUser
        },
        createLink: async (_parent: any, args: { name: string, url: string }) => {
            await connect()

            const session = await getServerSession(authOptions)
            if (!session?.user?.username) throw new Error("Unauthorized")

            let user = await User.findOne({ username: session?.user?.username })
            if (!user) {
                throw new Error('User not found')
            }

            const newLink = new Link({ name: args.name, url: args.url, owner: user._id })
            await newLink.save()

            user.link.push(newLink._id)
            await user.save()

            return newLink

        },
        updateLink: async (_parent: any, args: { id: string, name: string, url: string }) => {
            await connect()

            if (!mongoose.isValidObjectId(args.id)) {
                throw new Error('Invalid ID format')
            }

            const updateLink = await Link.findByIdAndUpdate(
                { _id: args.id },
                { name: args.name, url: args.url },
                { new: true }
            )
            if (!updateLink) throw new Error('Link not found')
            return updateLink
        },
        updateLinkOrder: async (_parent: any, args: { userId: string, orderedIds: string[] }) => {
            await connect()

            if (!mongoose.isValidObjectId(args.userId)) {
                throw new Error('Invalid User ID format')
            }
            const user = await User.findById(args.userId)
            if (!user) throw new Error('User not found');

            // Update the order
            const newLinkOrder = args.orderedIds
                .map(id => user.link.find((l: any) => l._id.toString() === id))
                .filter(Boolean)
            user.link = newLinkOrder
            await user.save()

            // Populate the links to return
            await user.populate('link', 'name url')

            return {
                success: true,
                links: user.link
            }
        },
        deleteLink: async (_parent: any, args: { userId: string, id: string }) => {
            await connect()

            if (!mongoose.isValidObjectId(args.userId) || !mongoose.isValidObjectId(args.id)) {
                throw new Error('Invalid ID format')
            }

            await User.updateOne(
                { _id: args.userId },
                { $pull: { link: new mongoose.Types.ObjectId(args.id) } }
            )

            await Link.deleteOne({ _id: args.id })
            return true
        }
    }
}

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true
})

const handler = startServerAndCreateNextHandler<NextRequest>(
    apolloServer,
    {
        context: async (req) => {
            return {
                headers: req.headers,
            }
        },
    }
)

export async function GET(request: NextRequest) {
  return handler(request)
}

export async function POST(request: NextRequest) {
  return handler(request)
}