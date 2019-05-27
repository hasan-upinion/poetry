import { Args } from 'prisma-client-lib/dist/types';
import { Prisma } from '../prisma/generated/prisma-client';

interface Context {
    prisma: Prisma;
    request: any;
}

enum Status {
    PUBLIC,
    PRIVATE
}
interface PoemInput {
    text: string;
    title: string;
    imageSrc: string;
    imageName: string;
    status?: Status
}

export const poemResolvers = {
    Query: {
        poems: (_: any, args: Args, context: Context) => {
            return context.prisma.poems();
        },
    },
    Mutation: {
        createPoem: async (_: any, {imageName, imageSrc, text, title }: PoemInput, context: Context) => {
            const userId = context.request.userId;
            if (!userId) {
                throw Error('Login first!');
            }
            return context.prisma.createPoem({
                author: { connect: { id: userId } },
                imageName,
                imageSrc,
                text,
                title,
            });
        },
    },
    Subscription: {
        newPoem: {
            subscribe: async (_: any, args: Args, context: Context) => {
                return context.prisma.$subscribe
                    .poem({ mutation_in: ['CREATED'] })
                    .node();
            },
            resolve: (payload: any) => payload,
        },
    },
};

// export default resolvers;
