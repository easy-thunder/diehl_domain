import "next-auth";

declare module "next-auth" {
  interface User {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    profile?: any;
  }
  
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userProfile?: any;
  }
} 