import CredentialsProvider from "next-auth/providers/credentials";
// import { compare } from "bcryptjs";
import { NextAuthOptions } from "next-auth";

import { Admin } from "@/models/Admin";
// import GoogleProvider from "next-auth/providers/google";
// import GithubProvider from "next-auth/providers/github";
import { connectDB } from "@/models";
import bcrypt from "bcryptjs";

/* eslint-disable @typescript-eslint/no-explicit-any */
const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    // Default maxAge (seconds) used by NextAuth when issuing tokens/cookies
    maxAge: 60 * 60, // 1 hour
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials) return null;
          if (!credentials.email || !credentials.password) {
            console.log("Authorize: missing credentials");
            return null;
          }
          await connectDB();

          const admin = await Admin.findOne({
            email: credentials.email,
          }).select("+password");

          if (!admin) {
            console.log("Authorize: no admin for", credentials.email);
            return null;
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            admin.password,
          );

          if (!isPasswordCorrect) {
            console.log("Authorize: password mismatch for", credentials.email);
            return null;
          }

          // include the `remember` flag so callbacks can act on it
          const remember = Boolean((credentials as any).remember);

          return {
            id: admin.id,
            email: admin.email,
            role: admin.role,
            remember,
          } as any;
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),
  ],
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.ENV === "production",
      },
    },
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        // persist remember flag from the authorize() result
        token.remember = user.remember ?? false;

        // set explicit expiry on the token depending on `remember`
        const maxAge = 60 * 60; // 1 hour
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
