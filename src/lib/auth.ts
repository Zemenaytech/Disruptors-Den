import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/tadmind/signIn",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "disruptors_den@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const existingUser = await db.user.findUnique({
          where: { email: credentials.email },
        });
        if (!existingUser) return null;

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password
        );
        if (!passwordMatch) return null;

        return { id: `${existingUser.id}`, email: existingUser.email };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // ✅ Corrected
      if (token) {
        session.user = {
          ...session.user,
          email: token.email,
          //  id: token.id,
        };
      }
      return session;
    },
  },
};
