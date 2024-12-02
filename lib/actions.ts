"use server";
import { RegisterSchema, SignInSchema } from "@/lib/zod";
import { hashSync } from "bcrypt-ts";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { getSession } from "next-auth/react";

export const signUpCredentials = async (
  prevState: unknown,
  formData: FormData
) => {
  const validatedFields = RegisterSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = hashSync(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.log(error);
    return { message: "Gagal Mendaftar" };
  }
  redirect("/login");
};

// Sign in Credential action
export const signInCredentials = async (
  prevState: unknown,
  formData: FormData
) => {
  const validatedFields = SignInSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", { email, password, redirectTo: "/masuk-data" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Alamat Surel atau Kata Sandi Salah" };
        default:
          return { message: "Gagal Masuk" };
      }
    }
    throw error;
  }
};

export const TolakUser = async (userId) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });

    if (deletedUser) {
      return { message: "Pengguna Berhasil Dihapus" };
    } else {
      return { message: "Penggguna Tidak Ditemukan" };
    }
  } catch (error) {
    console.error("Failed to delete user:", error);
    return { message: "Pengguna Gagal Dihapus" };
  }
};

export const updateUserStatus = async (userId) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isUser: true },
    });

    if (updatedUser) {
      return { message: "User status has been updated successfully." };
    } else {
      return { message: "User not found." };
    }
  } catch (error) {
    console.error("Failed to update user status:", error);
    return { message: "Failed to update user status." };
  }
};

export const resetPassword = async (userId) => {
  try {
    const defaultPassword = "12345678"; // Password default
    const hashedPassword = hashSync(defaultPassword, 10); // Hash password default

    // Update password di database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }, // Update password yang sudah di-hash
    });

    if (updatedUser) {
      return { message: "Kata Sandi Sudah Diatur ke 12345678" };
    } else {
      return { message: "Pengguna tidak Ditemukan" };
    }
  } catch (error) {
    return { message: "Kata Sandi Gagal Diatur Ulang" };
  }
};

export const ubahSandi = async (userId, newPassword) => {
  // Validasi jika password baru tidak diberikan
  if (!newPassword) {
    return { message: "Password baru harus diisi." };
  }

  try {
    // Hash password baru
    const hashedPassword = hashSync(newPassword, 10);

    // Update password di database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    // Cek apakah password berhasil diubah
    if (updatedUser) {
      return { message: "Kata sandi berhasil diubah." };
    } else {
      return { message: "Pengguna tidak ditemukan." };
    }
  } catch (error) {
    return { message: "Terjadi kesalahan saat mengubah kata sandi." };
  }
};
