import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from '../utils/db/user'
import { compare } from 'bcryptjs'
import { NextAuthOptions } from "next-auth";
import { connect } from './mongodb';
import { ObjectId } from 'mongodb'

await connect()

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 1 * 60 * 60 * 24,
    },
    pages: {
        signIn: '/login',
        signOut: '/login',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
        CredentialsProvider({
            name: 'Credentials',
            id: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(crendentials) {
                await connect()

                if (!crendentials?.email || !crendentials?.password) {
                    return null
                }

                const existingUser = await User.findOne({ email: crendentials.email })

                // if(!existingUser.active) throw new Error('Please activate your account')
                if (!existingUser || !existingUser.password) throw new Error('User not found')

                const passwordMatch = await compare(crendentials.password, existingUser.password)
                if (!passwordMatch) throw new Error('Incorrect password')

                return {
                    id: existingUser.id,
                    username: existingUser.username,
                    email: existingUser.email,
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user && 'username' in user) {
                const existingUser = await User.findOne({ email: user.email })
                if(existingUser){
                    return {
                        ...token,
                        username: user.username
                    }
                }
            }
            return token
        },
        async session({ session, token }) {
            const existingUser = await User.findOne({ email: token.email })
            return {
                ...session,
                user: {
                    ...session.user,
                    username: token.username || session.user?.name,
                    id: existingUser._id
                }
            }
        },
        async signIn({ profile, account }) {
            if(account?.provider === 'google'){
                const userData = await User.findOne({ email: profile?.email })
                let uniqueId = Math.floor(Math.random() * 90000 + 10000)

                if(!userData){
                    const newUser = new User({
                        _id: new ObjectId(),
                        email: profile?.email,
                        username: `${profile?.name?.split(' ')[0].toLowerCase()}${uniqueId}`,
                        password: null
                    })
                    await newUser.save()
                }
            }
            return true
        },
        async redirect({ url, baseUrl }) {
            if( url.startsWith('/')) return `${baseUrl}/${url}`
            else if ( new URL(url).origin === baseUrl ) return url
            return baseUrl
        }
    }
}