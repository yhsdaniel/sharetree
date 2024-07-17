import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from './user'
import { compare } from 'bcryptjs'

export const authOptions = {
    provider: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', text: 'text', placeholder: 'Email' },
                password: { label: 'Password', text: 'text', placeholder: 'Passwords' },
            },
            async authorize(crendentials) {
                if (!crendentials?.email || !crendentials?.password) {
                    throw new Error('Please enter your an email and password')
                }

                const existingUser = await User.findOne({ email: crendentials.email })

                // if(!existingUser.active) throw new Error('Please activate your account')
                if(!existingUser || !existingUser.password) throw new Error('User not found')

                const passwordMatch = await compare(crendentials.password, existingUser.password)
                if(!passwordMatch) throw new Error('Incorrect password')
                    
                return {
                    id: existingUser.id,
                    username: existingUser.username,
                    email: existingUser.email,
                }
            }
        })
    ]
}