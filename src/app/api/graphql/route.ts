import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { typeDefs, resolvers } from '@/graphql/schema'

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true
})

const handler = startServerAndCreateNextHandler(apolloServer)

export { handler as GET, handler as POST }