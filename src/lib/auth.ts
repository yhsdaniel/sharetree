import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from '../utils/user'
import { compare } from 'bcryptjs'
import { NextAuthOptions } from "next-auth";
import { connect } from './mongodb';

export const authOptions: NextAuthOptions = {
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 1 * 60 * 60 * 24
    },
    pages: {
        signIn: '/login',
        signOut: '/login',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
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
                if (!existingUser) {
                    const newUser = new User({
                        username: user.username,
                        email: user.email,
                    })
                    await newUser.save()
                }
                return {
                    ...token,
                    username: user.username
                }
            }
            return token
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    username: token.username
                }
            }
        },
        async redirect({ url, baseUrl }) {
            if( url.startsWith('/')) return `${baseUrl}${url}`
            else if ( new URL(url).origin === baseUrl ) return url
            return baseUrl
        }
    }
}