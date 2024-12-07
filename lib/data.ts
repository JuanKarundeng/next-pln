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

export const getUsersByIsUserFalse = async () => {
  try {
    // Mendapatkan session pengguna
    const session = await auth();
    // Memeriksa apakah session valid dan pengguna adalah admin
    if (!session || !session.user || session.user.role !== "admin") {
      redirect("/dashboard"); // Jika tidak, arahkan ke halaman dashboard
    }

    // Mengambil data pengguna dengan isUser = false
    const users = await prisma.user.findMany({
      where: { isUser: false }, // Filter berdasarkan status isUser false
    });

    // Mengembalikan data pengguna
    return users;
  } catch (error) {
    console.log("Error mengambil data pengguna:", error); // Menangani error jika ada
    return []; // Mengembalikan array kosong jika terjadi error
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
