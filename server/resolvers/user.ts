import { Args } from 'prisma-client-lib/dist/types';
import { Prisma } from '../prisma/generated/prisma-client';

interface Context {
    prisma: Prisma;
    request: any;
}

export const userResolvers = {
    Query: {
        users: (_: any, args: Args, context: Context) => {
            return context.prisma.users();
        },
        user: (_: any, args: Args, context: Context) => {
            return context.prisma.user({ email: args.email });
        },
    },
    Subscription: {
        newUser: {
            subscribe: async (_: any, args: Args, context: Context) => {
                return context.prisma.$subscribe
                    .user({ mutation_in: ['CREATED'] })
                    .node();
            },
            resolve: (payload: any) => payload,
        },
    },
};

// export default resolvers;
