import { GraphQLServer } from 'graphql-yoga';
import { verify } from 'jsonwebtoken';
import { prisma } from './prisma/generated/prisma-client';
import { resolvers } from './resolvers';
import cookieParser = require('cookie-parser');

const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers,
    context: (request, res) => ({ ...request, ...res, prisma }),
});

server.use(cookieParser())

server.use((req: any, res, next) => {
    try {
    const token = req.cookies.token;
    const verified =  verify(token, 'myhightsecret12') as any;
    req.userId = verified.userId;
    } catch {}
    next();
})

server.start(() => console.log(`server is running on 4000`));
