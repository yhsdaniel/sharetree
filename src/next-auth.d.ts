import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        username?: string;
        email?: string;
        image?: string;
    }

    interface Session {
        user: User;
    }

    interface JWT {
        id: string;
        username?: string;
        email?: string;
        image?: string;
    }
}