import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth , { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import prisma from "../../../src/libs/prismadb";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    //...add more providers here
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          //logAuth('warning', 'Eksik kimlik bilgileri');
          throw new Error("E-posta ve şifre gereklidir");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user || !user?.hashedPassword) {
          //logAuth('warning', 'Kullanıcı bulunamadı', { email: credentials.email });
          throw new Error("Geçersiz e-posta veya şifre");
        }
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isCorrectPassword) {
          //logAuth('warning', 'Yanlış şifre', { email: credentials.email });
          throw new Error("Geçersiz e-posta veya şifre");
        }
        //logAuth('info', 'Başarılı giriş', { email: user.email });
        return user;
      },
    }),
  ],
  pages: {
      signIn: "/",
    },
    debug: process.env.NODE_ENV === "development",
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET!,
};

export default NextAuth(authOptions);
