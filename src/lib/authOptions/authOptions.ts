import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "@/lib/prisma/service";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_URL,
    providers: [
        CredentialsProvider({
            type: 'credentials',
            name: 'Credentials',
            credentials: {
                username: {
                    label: 'username',
                    type: 'text',
                    placeholder: 'username'
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Password'
                },
            },
            async authorize(credentials) {
                const { username, password } = credentials as {
                    username: string;
                    password: string;
                };
                // const user: any = {
                //         id: 1,
                //         name: "admin",
                //         username: "admin",
                //         role: "admin"
                // }
                // if(username === "admin" && password === "admin"){
                //     return user;
                // }else{
                //     return null;
                // }
                const user:any = await login({username})
                if (user){
                    const passwordConfirm = await compare(password, user.password);
                    if(passwordConfirm){
                        return user;
                    }
                    return null;
                }
                else {
                    return null;
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, account, profile, user, username}: any){
            if (account?.provider === "credentials"){
                token.role = user.role;
                token.username = user.username;
                token.id = user.id
            }
            return token
        },
        async session({ session, token }: any) {
            if ("role" in token) {
                session.user.role = token.role;
            }
            if ("username" in token) {
                session.user.username = token.username;
            }
            if ("id" in token) {
                session.user.id = token.id;
            }
            return session
        }
    },
    pages: {
        signIn: '/login',
    }
}