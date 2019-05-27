import { Poem, Prisma } from '../prisma/generated/prisma-client';
import { authResolver } from './auth';
import { poemResolvers } from './poem';
import { userResolvers } from './user';

interface Context {
    prisma: Prisma;
    request: any;
}

const mainResolvers = {
    Query: {
        ...poemResolvers.Query,
        ...userResolvers.Query,
    },
    Mutation: {
        ...poemResolvers.Mutation,
    },
    Subscription: {
        ...poemResolvers.Subscription,
        ...userResolvers.Subscription,
    },
    User: {
        userName() {
            return '👊';
        },
    },
    Poem: {
        text(parent: Poem) {
            return `${parent.text} 👊`;
        },
    },
};

export const resolvers = {
    ...mainResolvers,
    ...authResolver,
};
