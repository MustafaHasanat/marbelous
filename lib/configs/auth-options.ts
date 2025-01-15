/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    secret: process.env.JWT_TOKEN,
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/en/login",
        newUser: "/en/register",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { type: "string" },
                password: { type: "string" },
            },
            async authorize(credentials: any) {
                const { access, refresh, is_staff, ...rest } = credentials;

                return {
                    ...rest,
                    is_staff: is_staff === "true",
                    tokens: {
                        access,
                        refresh,
                    },
                } as any;
            },
        }),
    ],
    callbacks: {
        // called after the authorize function is finished
        jwt: async ({ token, user, session, trigger }) => {
            if (user) {
                token.id = user.id;
            }

            if (user) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const userObj = user as unknown as any;
                return {
                    ...token,
                    ...userObj,
                };
            }

            if (trigger === "update") {
                token = { ...token, ...session };
            }

            return token;
        },
        // called after the jwt function is finished
        session: ({ session, token }) => {
            const { sub, image, ...rest } = token;

            session.user.id = token.id as string;

            return {
                ...session,
                user: {
                    ...session.user,
                    ...rest,
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any;
        },
    },
};
