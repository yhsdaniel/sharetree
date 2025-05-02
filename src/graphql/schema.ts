import { gql } from 'graphql-tag'
import { connect } from '@/lib/mongodb'
import mongoose from 'mongoose'
import Link from '@/utils/db/links'
import User from '@/utils/db/user'

export const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        link: [Link]
    }

    type Link {
        _id: ID
        url: String
        name: String
    }

    type Query {
        users: [User]
        user(id: ID!): User
        links: [Link]
        link(id: ID!): Link
    }

    type Mutation {
        updateLink(id: ID!, name: String!, url: String!): Link
    }
`

export const resolvers = {
    Query: {
        user: async (_parent: any, args: { id: string }) => {
            const { id } = args 
            await connect()
            const user = await User.findById(id).populate('link').exec()
            if(!user){
                return null
            }
            return {
                username: user.username,
                link: user.link.map((linkval: any) => ({
                    _id: linkval._id,
                    name: linkval.name,
                    url: linkval.url
                }))
            }
        }
    },
    Mutation: {
        updateLink: async (_parent: any, args: { id: string, name: string, url: string }) => {
            const { id, name, url } = args
            console.log(id, name, url, 'id name url')
            await connect()
            if(id){
                const link = await Link.findOneAndUpdate({ _id: id }, { name, url })
                return {
                    _id: link?._id,
                    name: link?.name,
                    url: link?.url
                }
            }
        }
    }
}