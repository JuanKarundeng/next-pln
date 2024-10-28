"use server";

import { signOut as nextSignOut } from "@/auth";

// Fungsi signOut dengan server action
export async function signOut() {
  await nextSignOut({ redirectTo: "/" });
}
