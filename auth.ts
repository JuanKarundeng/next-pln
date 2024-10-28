import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { SignInSchema } from "@/lib/zod";
import { compareSync } from "bcrypt-ts";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    Google,
    Github,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedFields = SignInSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        // Jika user tidak ditemukan atau isUser = false, return null
        if (!user || !user.password || user.isUser === false) {
          throw new Error("User not found or not authorized");
        }

        const passwordMatch = compareSync(password, user.password);

        if (!passwordMatch) return null;

        return user;
      },
    }),
  ],
  // callbacks
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const ProtectedRoutes = [
        "/dashboard",
        "/user",
        "/product",
        "/masuk-data",
        "/panel-admin",
        "/daftar-akun",
        "/pendaftar-baru",
        "/riwayat-data",
        "/ubah-harga",
        "/ubah-kata-sandi",
        "/validasi-pembayaran",
      ];

      if (!isLoggedIn && ProtectedRoutes.includes(nextUrl.pathname)) {
        return Response.redirect(new URL("/login", nextUrl));
      }

      if (isLoggedIn && nextUrl.pathname.startsWith("/login")) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },

    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },

    session({ session, token }) {
      session.user.id = token.sub;
      session.user.role = token.role;
      return session;
    },
  },
});
