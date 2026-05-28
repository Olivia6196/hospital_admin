import CredentialsProvider from "next-auth/providers/credentials";
// import { compare } from "bcryptjs";
import { NextAuthOptions } from "next-auth";

import { Admin } from "@/models/Admin";
// import GoogleProvider from "next-auth/providers/google";
// import GithubProvider from "next-auth/providers/github";
import { connectDB } from "@/models"

/* eslint-disable @typescript-eslint/no-explicit-any */
const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    // Default maxAge (seconds) used by NextAuth when issuing tokens/cookies
    maxAge: 2 * 60, // 2 minutes
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        if (!credentials.email || !credentials.password) {
          return null;
        }
        await connectDB();

        const admin = await Admin.findOne({ email: credentials.email }).select(
          "+password",
        );
        if (!admin) return null;

        // include the `remember` flag so callbacks can act on it
        const remember = Boolean((credentials as any).remember);

        return {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          image: admin.image,
          remember,
        } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        // persist remember flag from the authorize() result
        token.remember = user.remember ?? false;

        // set explicit expiry on the token depending on `remember`
        const maxAge = 2 * 60; // 2 minutes
        token.exp = Math.floor(Date.now() / 1000) + maxAge;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.remember = Boolean(token.remember);
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
export default authOptions;