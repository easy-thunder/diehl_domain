
//Deprecated route but I am keeping it for reference.
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import type { AuthOptions } from "next-auth/core/types";


declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      profile?: any;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userProfile?: any;
  }
}

export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,

    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
          }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ profile }) {
        if (!profile?.email) {
            throw new Error("No profile email found");
        }
        return true;
        },
        async jwt({ token, profile }) {
        if (profile) token.userProfile = profile;
        return token;
        },
        async session({ session, token }) {
        if (session.user && token.userProfile) {
            session.user.profile = token.userProfile;
        }
        return session;
        },
    },
};

export default NextAuth(authOptions);
