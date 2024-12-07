// Importing necessary types from next-auth
import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

// Extend the `next-auth` Session interface
declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"]; // Combine the default user with your custom user type
  }

  interface User {
    role: string; // Add the `role` field to the user
  }
}

// Extend the `next-auth/jwt` JWT interface
declare module "next-auth/jwt" {
  interface JWT {
    sub: string; // Add the `sub` field to the JWT (user ID)
    role: string; // Add the `role` field to the JWT (user's role)
  }
}

// @types/authjs.d.ts
// @types/authjs.d.ts

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  image: string | null;
  isUser: boolean | null | undefined; // Menyesuaikan dengan tipe yang diinginkan
  emailVerified: Date | null;
  password: string | null;
}
