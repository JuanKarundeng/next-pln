import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { hashSync } from "bcrypt-ts";
import { NextApiRequest, NextApiResponse } from "next";

// Example function to fetch users with isUser = false

export const getUsers = async () => {
  const session = await auth();
  if (!session || !session.user || session.user.role !== "admin")
    redirect("/dashboard");

  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.log(error);
  }
};

export const getUsersByIsUserTrue = async () => {
  const session = await auth();
  if (!session || !session.user || session.user.role !== "admin")
    redirect("/dashboard");

  try {
    const users = await prisma.user.findMany({
      where: { isUser: true }, // Mengambil pengguna dengan isUser = true
    });
    return users;
  } catch (error) {
    console.log(error);
  }
};

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  image: string | null;
  isUser: boolean | null;
  emailVerified: Date | null;
  password: string | null;
}

export const getUsersByIsUserFalse = async (): Promise<User[]> => {
  const session = await auth();
  if (!session || !session.user || session.user.role !== "admin") {
    redirect("/dashboard");
  }

  try {
    const users = await prisma.user.findMany({
      where: { isUser: false },
    });

    // Pastikan hasil cocok dengan tipe User
    return users.map((user) => ({
      id: user.id,
      name: user.name || null,
      email: user.email || null,
      role: user.role,
      image: user.image || null,
      isUser: user.isUser || null,
      emailVerified: user.emailVerified || null,
      password: user.password || null,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, newPassword } = req.body;

  // Validasi input
  if (!userId || !newPassword) {
    return res
      .status(400)
      .json({ message: "User ID and new password are required." });
  }

  try {
    // Hash password baru sebelum menyimpannya
    const hashedPassword = hashSync(newPassword, 10);

    // Perbarui password pengguna di database
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return res
      .status(200)
      .json({ message: "Password has been reset successfully." });
  } catch (error) {
    console.error("Failed to reset password:", error);
    return res.status(500).json({ message: "Failed to reset password." });
  }
};
