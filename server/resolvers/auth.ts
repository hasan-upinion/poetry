import { compare, hash } from 'bcrypt';
import { Response } from 'express';
import { sign } from 'jsonwebtoken';
import { Prisma } from '../prisma/generated/prisma-client';


interface Context {
    prisma: Prisma;
    request: any;
    response: Response;
}

interface UserInput {
    userName: string;
    email: string;
    password: string;
    avatar: string;
}

export const authResolver = {
    Mutation: {
        signup: async (_: any, args: UserInput, context: Context) => {
            try {
                const existUser = await context.prisma.user({
                    email: args.email,
                });
                if (existUser) {
                    throw Error('User exists.');
                }

                const password = await hash(args.password, 10);

                const user = await context.prisma.createUser({
                    email: args.email,
                    password,
                    userName: args.userName,
                    avatar: args.avatar,
                    loggedIn: true,
                });

                const token = sign({ userId: user.id }, 'myhightsecret12');

                context.response.cookie('token', token, {
                    expires: new Date(Date.now() + 60 * 60 * 24),
                });

                return {
                    token,
                    user,
                };
            } catch (e) {
                // handle error
                console.log('error', e);
                return e;
            }
        },
        login: async (_: any, args: any, context: Context) => {
            try {
                const user = await context.prisma.user({
                    email: args.email,
                });
                if (!user) {
                    console.log(user);
                    throw Error('User not exist.');
                }

                const valid = await compare(args.password, user.password);
                if (!valid) {
                    throw Error('Invalid password.');
                }

                const token = sign({ userId: user.id }, 'myhightsecret12', {
                    expiresIn: '2d',
                });

                context.response.cookie('token', token, {
                    expires: new Date(Date.now() + 60 * 60 * 24),
                });
                return {
                    token,
                    user,
                };
            } catch (e) {
                // handle error
                console.log('error', e);
                return e;
            }
        },
    },
};
